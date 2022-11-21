
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    // Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
    // at the end of hydration without touching the remaining nodes.
    let is_hydrating = false;
    function start_hydrating() {
        is_hydrating = true;
    }
    function end_hydrating() {
        is_hydrating = false;
    }
    function upper_bound(low, high, key, value) {
        // Return first index of value larger than input value in the range [low, high)
        while (low < high) {
            const mid = low + ((high - low) >> 1);
            if (key(mid) <= value) {
                low = mid + 1;
            }
            else {
                high = mid;
            }
        }
        return low;
    }
    function init_hydrate(target) {
        if (target.hydrate_init)
            return;
        target.hydrate_init = true;
        // We know that all children have claim_order values since the unclaimed have been detached if target is not <head>
        let children = target.childNodes;
        // If target is <head>, there may be children without claim_order
        if (target.nodeName === 'HEAD') {
            const myChildren = [];
            for (let i = 0; i < children.length; i++) {
                const node = children[i];
                if (node.claim_order !== undefined) {
                    myChildren.push(node);
                }
            }
            children = myChildren;
        }
        /*
        * Reorder claimed children optimally.
        * We can reorder claimed children optimally by finding the longest subsequence of
        * nodes that are already claimed in order and only moving the rest. The longest
        * subsequence of nodes that are claimed in order can be found by
        * computing the longest increasing subsequence of .claim_order values.
        *
        * This algorithm is optimal in generating the least amount of reorder operations
        * possible.
        *
        * Proof:
        * We know that, given a set of reordering operations, the nodes that do not move
        * always form an increasing subsequence, since they do not move among each other
        * meaning that they must be already ordered among each other. Thus, the maximal
        * set of nodes that do not move form a longest increasing subsequence.
        */
        // Compute longest increasing subsequence
        // m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j
        const m = new Int32Array(children.length + 1);
        // Predecessor indices + 1
        const p = new Int32Array(children.length);
        m[0] = -1;
        let longest = 0;
        for (let i = 0; i < children.length; i++) {
            const current = children[i].claim_order;
            // Find the largest subsequence length such that it ends in a value less than our current value
            // upper_bound returns first greater value, so we subtract one
            // with fast path for when we are on the current longest subsequence
            const seqLen = ((longest > 0 && children[m[longest]].claim_order <= current) ? longest + 1 : upper_bound(1, longest, idx => children[m[idx]].claim_order, current)) - 1;
            p[i] = m[seqLen] + 1;
            const newLen = seqLen + 1;
            // We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.
            m[newLen] = i;
            longest = Math.max(newLen, longest);
        }
        // The longest increasing subsequence of nodes (initially reversed)
        const lis = [];
        // The rest of the nodes, nodes that will be moved
        const toMove = [];
        let last = children.length - 1;
        for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
            lis.push(children[cur - 1]);
            for (; last >= cur; last--) {
                toMove.push(children[last]);
            }
            last--;
        }
        for (; last >= 0; last--) {
            toMove.push(children[last]);
        }
        lis.reverse();
        // We sort the nodes being moved to guarantee that their insertion order matches the claim order
        toMove.sort((a, b) => a.claim_order - b.claim_order);
        // Finally, we move the nodes
        for (let i = 0, j = 0; i < toMove.length; i++) {
            while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
                j++;
            }
            const anchor = j < lis.length ? lis[j] : null;
            target.insertBefore(toMove[i], anchor);
        }
    }
    function append_hydration(target, node) {
        if (is_hydrating) {
            init_hydrate(target);
            if ((target.actual_end_child === undefined) || ((target.actual_end_child !== null) && (target.actual_end_child.parentNode !== target))) {
                target.actual_end_child = target.firstChild;
            }
            // Skip nodes of undefined ordering
            while ((target.actual_end_child !== null) && (target.actual_end_child.claim_order === undefined)) {
                target.actual_end_child = target.actual_end_child.nextSibling;
            }
            if (node !== target.actual_end_child) {
                // We only insert if the ordering of this node should be modified or the parent node is not target
                if (node.claim_order !== undefined || node.parentNode !== target) {
                    target.insertBefore(node, target.actual_end_child);
                }
            }
            else {
                target.actual_end_child = node.nextSibling;
            }
        }
        else if (node.parentNode !== target || node.nextSibling !== null) {
            target.appendChild(node);
        }
    }
    function insert_hydration(target, node, anchor) {
        if (is_hydrating && !anchor) {
            append_hydration(target, node);
        }
        else if (node.parentNode !== target || node.nextSibling != anchor) {
            target.insertBefore(node, anchor || null);
        }
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function init_claim_info(nodes) {
        if (nodes.claim_info === undefined) {
            nodes.claim_info = { last_index: 0, total_claimed: 0 };
        }
    }
    function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
        // Try to find nodes in an order such that we lengthen the longest increasing subsequence
        init_claim_info(nodes);
        const resultNode = (() => {
            // We first try to find an element after the previous one
            for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
                const node = nodes[i];
                if (predicate(node)) {
                    const replacement = processNode(node);
                    if (replacement === undefined) {
                        nodes.splice(i, 1);
                    }
                    else {
                        nodes[i] = replacement;
                    }
                    if (!dontUpdateLastIndex) {
                        nodes.claim_info.last_index = i;
                    }
                    return node;
                }
            }
            // Otherwise, we try to find one before
            // We iterate in reverse so that we don't go too far back
            for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
                const node = nodes[i];
                if (predicate(node)) {
                    const replacement = processNode(node);
                    if (replacement === undefined) {
                        nodes.splice(i, 1);
                    }
                    else {
                        nodes[i] = replacement;
                    }
                    if (!dontUpdateLastIndex) {
                        nodes.claim_info.last_index = i;
                    }
                    else if (replacement === undefined) {
                        // Since we spliced before the last_index, we decrease it
                        nodes.claim_info.last_index--;
                    }
                    return node;
                }
            }
            // If we can't find any matching node, we create a new one
            return createNode();
        })();
        resultNode.claim_order = nodes.claim_info.total_claimed;
        nodes.claim_info.total_claimed += 1;
        return resultNode;
    }
    function claim_element_base(nodes, name, attributes, create_element) {
        return claim_node(nodes, (node) => node.nodeName === name, (node) => {
            const remove = [];
            for (let j = 0; j < node.attributes.length; j++) {
                const attribute = node.attributes[j];
                if (!attributes[attribute.name]) {
                    remove.push(attribute.name);
                }
            }
            remove.forEach(v => node.removeAttribute(v));
            return undefined;
        }, () => create_element(name));
    }
    function claim_element(nodes, name, attributes) {
        return claim_element_base(nodes, name, attributes, element);
    }
    function claim_svg_element(nodes, name, attributes) {
        return claim_element_base(nodes, name, attributes, svg_element);
    }
    function claim_text(nodes, data) {
        return claim_node(nodes, (node) => node.nodeType === 3, (node) => {
            const dataStr = '' + data;
            if (node.data.startsWith(dataStr)) {
                if (node.data.length !== dataStr.length) {
                    return node.splitText(dataStr.length);
                }
            }
            else {
                node.data = dataStr;
            }
        }, () => text(data), true // Text nodes should not update last index since it is likely not worth it to eliminate an increasing subsequence of actual elements
        );
    }
    function claim_space(nodes) {
        return claim_text(nodes, ' ');
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function claim_component(block, parent_nodes) {
        block && block.l(parent_nodes);
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                start_hydrating();
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            end_hydrating();
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.53.1' }, detail), { bubbles: true }));
    }
    function append_hydration_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append_hydration(target, node);
    }
    function insert_hydration_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert_hydration(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/Header.svelte generated by Svelte v3.53.1 */

    const file$4 = "src/components/Header.svelte";

    function create_fragment$5(ctx) {
    	let header;
    	let img;
    	let img_src_value;
    	let t0;
    	let div;
    	let h1;
    	let span0;
    	let t1;
    	let t2;
    	let span1;
    	let t3;
    	let t4;
    	let span2;
    	let t5;
    	let t6;
    	let span3;
    	let t7;
    	let t8;
    	let p;
    	let t9;
    	let a;
    	let t10;

    	const block = {
    		c: function create() {
    			header = element("header");
    			img = element("img");
    			t0 = space();
    			div = element("div");
    			h1 = element("h1");
    			span0 = element("span");
    			t1 = text("Ryan Marx");
    			t2 = space();
    			span1 = element("span");
    			t3 = text("Telling stories");
    			t4 = space();
    			span2 = element("span");
    			t5 = text("Visualizing data");
    			t6 = space();
    			span3 = element("span");
    			t7 = text("Creating experiences");
    			t8 = space();
    			p = element("p");
    			t9 = text("Photo by ");
    			a = element("a");
    			t10 = text("John J. Kim");
    			this.h();
    		},
    		l: function claim(nodes) {
    			header = claim_element(nodes, "HEADER", { id: true, class: true });
    			var header_nodes = children(header);
    			img = claim_element(header_nodes, "IMG", { class: true, src: true, alt: true });
    			t0 = claim_space(header_nodes);
    			div = claim_element(header_nodes, "DIV", { class: true });
    			var div_nodes = children(div);
    			h1 = claim_element(div_nodes, "H1", { class: true, "aria-label": true });
    			var h1_nodes = children(h1);
    			span0 = claim_element(h1_nodes, "SPAN", { class: true });
    			var span0_nodes = children(span0);
    			t1 = claim_text(span0_nodes, "Ryan Marx");
    			span0_nodes.forEach(detach_dev);
    			t2 = claim_space(h1_nodes);
    			span1 = claim_element(h1_nodes, "SPAN", { class: true });
    			var span1_nodes = children(span1);
    			t3 = claim_text(span1_nodes, "Telling stories");
    			span1_nodes.forEach(detach_dev);
    			t4 = claim_space(h1_nodes);
    			span2 = claim_element(h1_nodes, "SPAN", { class: true });
    			var span2_nodes = children(span2);
    			t5 = claim_text(span2_nodes, "Visualizing data");
    			span2_nodes.forEach(detach_dev);
    			t6 = claim_space(h1_nodes);
    			span3 = claim_element(h1_nodes, "SPAN", { class: true });
    			var span3_nodes = children(span3);
    			t7 = claim_text(span3_nodes, "Creating experiences");
    			span3_nodes.forEach(detach_dev);
    			h1_nodes.forEach(detach_dev);
    			div_nodes.forEach(detach_dev);
    			t8 = claim_space(header_nodes);
    			p = claim_element(header_nodes, "P", { class: true });
    			var p_nodes = children(p);
    			t9 = claim_text(p_nodes, "Photo by ");
    			a = claim_element(p_nodes, "A", { href: true, target: true, rel: true });
    			var a_nodes = children(a);
    			t10 = claim_text(a_nodes, "John J. Kim");
    			a_nodes.forEach(detach_dev);
    			p_nodes.forEach(detach_dev);
    			header_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(img, "class", "header__thumb svelte-3n9jdn");
    			if (!src_url_equal(img.src, img_src_value = "img/header-background--thumb.jpg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Ryan Marx");
    			add_location(img, file$4, 115, 1, 2205);
    			attr_dev(span0, "class", "header__text header__text--name svelte-3n9jdn");
    			add_location(span0, file$4, 120, 3, 2453);
    			attr_dev(span1, "class", "header__text header__text--stories svelte-3n9jdn");
    			add_location(span1, file$4, 121, 3, 2519);
    			attr_dev(span2, "class", "header__text header__text--data svelte-3n9jdn");
    			add_location(span2, file$4, 122, 3, 2594);
    			attr_dev(span3, "class", "header__text header__text--experiences svelte-3n9jdn");
    			add_location(span3, file$4, 123, 3, 2667);
    			attr_dev(h1, "class", "header__text-container svelte-3n9jdn");
    			attr_dev(h1, "aria-label", "Ryan Marx: Telling stories, visualizing data, creating experiences");
    			add_location(h1, file$4, 117, 2, 2328);
    			attr_dev(div, "class", "header__text-wrapper svelte-3n9jdn");
    			add_location(div, file$4, 116, 1, 2291);
    			attr_dev(a, "href", "https://twitter.com/jkimpictures");
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "rel", "noopener noreferrer");
    			add_location(a, file$4, 127, 11, 2809);
    			attr_dev(p, "class", "header__photo-credit svelte-3n9jdn");
    			add_location(p, file$4, 126, 1, 2765);
    			attr_dev(header, "id", "header");
    			attr_dev(header, "class", "header svelte-3n9jdn");
    			add_location(header, file$4, 114, 0, 2168);
    		},
    		m: function mount(target, anchor) {
    			insert_hydration_dev(target, header, anchor);
    			append_hydration_dev(header, img);
    			append_hydration_dev(header, t0);
    			append_hydration_dev(header, div);
    			append_hydration_dev(div, h1);
    			append_hydration_dev(h1, span0);
    			append_hydration_dev(span0, t1);
    			append_hydration_dev(h1, t2);
    			append_hydration_dev(h1, span1);
    			append_hydration_dev(span1, t3);
    			append_hydration_dev(h1, t4);
    			append_hydration_dev(h1, span2);
    			append_hydration_dev(span2, t5);
    			append_hydration_dev(h1, t6);
    			append_hydration_dev(h1, span3);
    			append_hydration_dev(span3, t7);
    			append_hydration_dev(header, t8);
    			append_hydration_dev(header, p);
    			append_hydration_dev(p, t9);
    			append_hydration_dev(p, a);
    			append_hydration_dev(a, t10);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/components/Contact.svelte generated by Svelte v3.53.1 */

    const file$3 = "src/components/Contact.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i].label;
    	child_ctx[2] = list[i].icon;
    	child_ctx[3] = list[i].url;
    	return child_ctx;
    }

    // (94:2) {#each networks as { label, icon, url }}
    function create_each_block$2(ctx) {
    	let li;
    	let a;
    	let span;
    	let t0;
    	let t1_value = /*label*/ ctx[0] + "";
    	let t1;
    	let t2;
    	let svg;
    	let title;
    	let t3_value = /*label*/ ctx[0] + "";
    	let t3;
    	let t4;
    	let use;
    	let t5;

    	const block = {
    		c: function create() {
    			li = element("li");
    			a = element("a");
    			span = element("span");
    			t0 = text("Visit me on ");
    			t1 = text(t1_value);
    			t2 = space();
    			svg = svg_element("svg");
    			title = svg_element("title");
    			t3 = text(t3_value);
    			t4 = text(" icon");
    			use = svg_element("use");
    			t5 = space();
    			this.h();
    		},
    		l: function claim(nodes) {
    			li = claim_element(nodes, "LI", { class: true });
    			var li_nodes = children(li);

    			a = claim_element(li_nodes, "A", {
    				href: true,
    				target: true,
    				rel: true,
    				class: true
    			});

    			var a_nodes = children(a);
    			span = claim_element(a_nodes, "SPAN", { class: true });
    			var span_nodes = children(span);
    			t0 = claim_text(span_nodes, "Visit me on ");
    			t1 = claim_text(span_nodes, t1_value);
    			span_nodes.forEach(detach_dev);
    			t2 = claim_space(a_nodes);
    			svg = claim_svg_element(a_nodes, "svg", { class: true });
    			var svg_nodes = children(svg);
    			title = claim_svg_element(svg_nodes, "title", {});
    			var title_nodes = children(title);
    			t3 = claim_text(title_nodes, t3_value);
    			t4 = claim_text(title_nodes, " icon");
    			title_nodes.forEach(detach_dev);
    			use = claim_svg_element(svg_nodes, "use", { href: true });
    			children(use).forEach(detach_dev);
    			svg_nodes.forEach(detach_dev);
    			a_nodes.forEach(detach_dev);
    			t5 = claim_space(li_nodes);
    			li_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(span, "class", "visually-hidden");
    			add_location(span, file$3, 96, 5, 2014);
    			add_location(title, file$3, 98, 6, 2101);
    			attr_dev(use, "href", "#" + /*icon*/ ctx[2]);
    			add_location(use, file$3, 99, 6, 2135);
    			attr_dev(svg, "class", "icon svelte-pwqb7t");
    			add_location(svg, file$3, 97, 5, 2076);
    			attr_dev(a, "href", /*url*/ ctx[3]);
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "rel", "noopener noreferrer");
    			attr_dev(a, "class", "svelte-pwqb7t");
    			add_location(a, file$3, 95, 4, 1952);
    			attr_dev(li, "class", "contact__link contact__link--" + /*label*/ ctx[0] + " svelte-pwqb7t");
    			add_location(li, file$3, 94, 3, 1898);
    		},
    		m: function mount(target, anchor) {
    			insert_hydration_dev(target, li, anchor);
    			append_hydration_dev(li, a);
    			append_hydration_dev(a, span);
    			append_hydration_dev(span, t0);
    			append_hydration_dev(span, t1);
    			append_hydration_dev(a, t2);
    			append_hydration_dev(a, svg);
    			append_hydration_dev(svg, title);
    			append_hydration_dev(title, t3);
    			append_hydration_dev(title, t4);
    			append_hydration_dev(svg, use);
    			append_hydration_dev(li, t5);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(94:2) {#each networks as { label, icon, url }}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let section;
    	let h2;
    	let t0;
    	let t1;
    	let ul;
    	let each_value = /*networks*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			section = element("section");
    			h2 = element("h2");
    			t0 = text(/*label*/ ctx[0]);
    			t1 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			this.h();
    		},
    		l: function claim(nodes) {
    			section = claim_element(nodes, "SECTION", { class: true, "aria-labelledby": true });
    			var section_nodes = children(section);
    			h2 = claim_element(section_nodes, "H2", { id: true, class: true });
    			var h2_nodes = children(h2);
    			t0 = claim_text(h2_nodes, /*label*/ ctx[0]);
    			h2_nodes.forEach(detach_dev);
    			t1 = claim_space(section_nodes);
    			ul = claim_element(section_nodes, "UL", { class: true });
    			var ul_nodes = children(ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].l(ul_nodes);
    			}

    			ul_nodes.forEach(detach_dev);
    			section_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(h2, "id", "contact-header");
    			attr_dev(h2, "class", "header contact__text svelte-pwqb7t");
    			add_location(h2, file$3, 89, 1, 1751);
    			attr_dev(ul, "class", "contact__social svelte-pwqb7t");
    			add_location(ul, file$3, 92, 1, 1823);
    			attr_dev(section, "class", "contact svelte-pwqb7t");
    			attr_dev(section, "aria-labelledby", "contact-header");
    			add_location(section, file$3, 88, 0, 1691);
    		},
    		m: function mount(target, anchor) {
    			insert_hydration_dev(target, section, anchor);
    			append_hydration_dev(section, h2);
    			append_hydration_dev(h2, t0);
    			append_hydration_dev(section, t1);
    			append_hydration_dev(section, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*label*/ 1) set_data_dev(t0, /*label*/ ctx[0]);

    			if (dirty & /*networks*/ 2) {
    				each_value = /*networks*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Contact', slots, []);
    	let { label = "Are you ready to get started? Let's talk:" } = $$props;

    	let networks = [
    		{
    			label: "Twitter",
    			icon: "twitter",
    			url: "https://www.twitter.com/ryanmarx"
    		},
    		{
    			label: "Github",
    			icon: "github",
    			url: "https://github.com/ryanbmarx"
    		},
    		// {
    		// 	label: "Instagram",
    		// 	icon: "instagram",
    		// 	url: "https://www.instagram.com/ryanmarx/",
    		// },
    		{
    			label: "LinkedIn",
    			icon: "linkedin",
    			url: "https://www.linkedin.com/in/ryanbmarx/"
    		},
    		{
    			label: "Email",
    			icon: "email",
    			url: "mailto:ryanbmarx+homepage@gmail.com"
    		}
    	];

    	const writable_props = ['label'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Contact> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('label' in $$props) $$invalidate(0, label = $$props.label);
    	};

    	$$self.$capture_state = () => ({ label, networks });

    	$$self.$inject_state = $$props => {
    		if ('label' in $$props) $$invalidate(0, label = $$props.label);
    		if ('networks' in $$props) $$invalidate(1, networks = $$props.networks);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [label, networks];
    }

    class Contact extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { label: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Contact",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get label() {
    		return this.$$.ctx[0];
    	}

    	set label(label) {
    		this.$$set({ label });
    		flush();
    	}
    }

    /* src/components/WorkItem.svelte generated by Svelte v3.53.1 */

    const file$2 = "src/components/WorkItem.svelte";

    // (37:1) {#if description}
    function create_if_block$1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			this.h();
    		},
    		l: function claim(nodes) {
    			p = claim_element(nodes, "P", { class: true });
    			var p_nodes = children(p);
    			p_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(p, "class", "svelte-1vq7pyn");
    			add_location(p, file$2, 37, 2, 657);
    		},
    		m: function mount(target, anchor) {
    			insert_hydration_dev(target, p, anchor);
    			p.innerHTML = /*description*/ ctx[4];
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*description*/ 16) p.innerHTML = /*description*/ ctx[4];		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(37:1) {#if description}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let li;
    	let h3;
    	let t0;
    	let t1;
    	let p;
    	let a;
    	let t2;
    	let t3;
    	let span;
    	let t4;
    	let t5;
    	let t6;
    	let t7;
    	let if_block = /*description*/ ctx[4] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			li = element("li");
    			h3 = element("h3");
    			t0 = text(/*role*/ ctx[3]);
    			t1 = space();
    			p = element("p");
    			a = element("a");
    			t2 = text(/*org*/ ctx[0]);
    			t3 = text(":\n\t\t");
    			span = element("span");
    			t4 = text(/*start*/ ctx[1]);
    			t5 = text(" to ");
    			t6 = text(/*end*/ ctx[2]);
    			t7 = space();
    			if (if_block) if_block.c();
    			this.h();
    		},
    		l: function claim(nodes) {
    			li = claim_element(nodes, "LI", { class: true });
    			var li_nodes = children(li);
    			h3 = claim_element(li_nodes, "H3", { class: true });
    			var h3_nodes = children(h3);
    			t0 = claim_text(h3_nodes, /*role*/ ctx[3]);
    			h3_nodes.forEach(detach_dev);
    			t1 = claim_space(li_nodes);
    			p = claim_element(li_nodes, "P", { class: true });
    			var p_nodes = children(p);

    			a = claim_element(p_nodes, "A", {
    				class: true,
    				href: true,
    				target: true,
    				rel: true
    			});

    			var a_nodes = children(a);
    			t2 = claim_text(a_nodes, /*org*/ ctx[0]);
    			a_nodes.forEach(detach_dev);
    			t3 = claim_text(p_nodes, ":\n\t\t");
    			span = claim_element(p_nodes, "SPAN", { class: true });
    			var span_nodes = children(span);
    			t4 = claim_text(span_nodes, /*start*/ ctx[1]);
    			t5 = claim_text(span_nodes, " to ");
    			t6 = claim_text(span_nodes, /*end*/ ctx[2]);
    			span_nodes.forEach(detach_dev);
    			p_nodes.forEach(detach_dev);
    			t7 = claim_space(li_nodes);
    			if (if_block) if_block.l(li_nodes);
    			li_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(h3, "class", "item__role svelte-1vq7pyn");
    			add_location(h3, file$2, 29, 1, 436);
    			attr_dev(a, "class", "org");
    			attr_dev(a, "href", /*orgLink*/ ctx[5]);
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "rel", "noopener noreferrer");
    			add_location(a, file$2, 33, 2, 502);
    			attr_dev(span, "class", "time");
    			add_location(span, file$2, 34, 2, 587);
    			attr_dev(p, "class", "item__meta svelte-1vq7pyn");
    			add_location(p, file$2, 32, 1, 477);
    			attr_dev(li, "class", "item svelte-1vq7pyn");
    			add_location(li, file$2, 28, 0, 417);
    		},
    		m: function mount(target, anchor) {
    			insert_hydration_dev(target, li, anchor);
    			append_hydration_dev(li, h3);
    			append_hydration_dev(h3, t0);
    			append_hydration_dev(li, t1);
    			append_hydration_dev(li, p);
    			append_hydration_dev(p, a);
    			append_hydration_dev(a, t2);
    			append_hydration_dev(p, t3);
    			append_hydration_dev(p, span);
    			append_hydration_dev(span, t4);
    			append_hydration_dev(span, t5);
    			append_hydration_dev(span, t6);
    			append_hydration_dev(li, t7);
    			if (if_block) if_block.m(li, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*role*/ 8) set_data_dev(t0, /*role*/ ctx[3]);
    			if (dirty & /*org*/ 1) set_data_dev(t2, /*org*/ ctx[0]);

    			if (dirty & /*orgLink*/ 32) {
    				attr_dev(a, "href", /*orgLink*/ ctx[5]);
    			}

    			if (dirty & /*start*/ 2) set_data_dev(t4, /*start*/ ctx[1]);
    			if (dirty & /*end*/ 4) set_data_dev(t6, /*end*/ ctx[2]);

    			if (/*description*/ ctx[4]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(li, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('WorkItem', slots, []);
    	let { org, start, end, role, description, orgLink } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (org === undefined && !('org' in $$props || $$self.$$.bound[$$self.$$.props['org']])) {
    			console.warn("<WorkItem> was created without expected prop 'org'");
    		}

    		if (start === undefined && !('start' in $$props || $$self.$$.bound[$$self.$$.props['start']])) {
    			console.warn("<WorkItem> was created without expected prop 'start'");
    		}

    		if (end === undefined && !('end' in $$props || $$self.$$.bound[$$self.$$.props['end']])) {
    			console.warn("<WorkItem> was created without expected prop 'end'");
    		}

    		if (role === undefined && !('role' in $$props || $$self.$$.bound[$$self.$$.props['role']])) {
    			console.warn("<WorkItem> was created without expected prop 'role'");
    		}

    		if (description === undefined && !('description' in $$props || $$self.$$.bound[$$self.$$.props['description']])) {
    			console.warn("<WorkItem> was created without expected prop 'description'");
    		}

    		if (orgLink === undefined && !('orgLink' in $$props || $$self.$$.bound[$$self.$$.props['orgLink']])) {
    			console.warn("<WorkItem> was created without expected prop 'orgLink'");
    		}
    	});

    	const writable_props = ['org', 'start', 'end', 'role', 'description', 'orgLink'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<WorkItem> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('org' in $$props) $$invalidate(0, org = $$props.org);
    		if ('start' in $$props) $$invalidate(1, start = $$props.start);
    		if ('end' in $$props) $$invalidate(2, end = $$props.end);
    		if ('role' in $$props) $$invalidate(3, role = $$props.role);
    		if ('description' in $$props) $$invalidate(4, description = $$props.description);
    		if ('orgLink' in $$props) $$invalidate(5, orgLink = $$props.orgLink);
    	};

    	$$self.$capture_state = () => ({
    		org,
    		start,
    		end,
    		role,
    		description,
    		orgLink
    	});

    	$$self.$inject_state = $$props => {
    		if ('org' in $$props) $$invalidate(0, org = $$props.org);
    		if ('start' in $$props) $$invalidate(1, start = $$props.start);
    		if ('end' in $$props) $$invalidate(2, end = $$props.end);
    		if ('role' in $$props) $$invalidate(3, role = $$props.role);
    		if ('description' in $$props) $$invalidate(4, description = $$props.description);
    		if ('orgLink' in $$props) $$invalidate(5, orgLink = $$props.orgLink);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [org, start, end, role, description, orgLink];
    }

    class WorkItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			org: 0,
    			start: 1,
    			end: 2,
    			role: 3,
    			description: 4,
    			orgLink: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WorkItem",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get org() {
    		return this.$$.ctx[0];
    	}

    	set org(org) {
    		this.$$set({ org });
    		flush();
    	}

    	get start() {
    		return this.$$.ctx[1];
    	}

    	set start(start) {
    		this.$$set({ start });
    		flush();
    	}

    	get end() {
    		return this.$$.ctx[2];
    	}

    	set end(end) {
    		this.$$set({ end });
    		flush();
    	}

    	get role() {
    		return this.$$.ctx[3];
    	}

    	set role(role) {
    		this.$$set({ role });
    		flush();
    	}

    	get description() {
    		return this.$$.ctx[4];
    	}

    	set description(description) {
    		this.$$set({ description });
    		flush();
    	}

    	get orgLink() {
    		return this.$$.ctx[5];
    	}

    	set orgLink(orgLink) {
    		this.$$set({ orgLink });
    		flush();
    	}
    }

    /* src/components/About.svelte generated by Svelte v3.53.1 */
    const file$1 = "src/components/About.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (108:3) {#each work as w}
    function create_each_block$1(ctx) {
    	let workitem;
    	let current;
    	const workitem_spread_levels = [/*w*/ ctx[1]];
    	let workitem_props = {};

    	for (let i = 0; i < workitem_spread_levels.length; i += 1) {
    		workitem_props = assign(workitem_props, workitem_spread_levels[i]);
    	}

    	workitem = new WorkItem({ props: workitem_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(workitem.$$.fragment);
    		},
    		l: function claim(nodes) {
    			claim_component(workitem.$$.fragment, nodes);
    		},
    		m: function mount(target, anchor) {
    			mount_component(workitem, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const workitem_changes = (dirty & /*work*/ 1)
    			? get_spread_update(workitem_spread_levels, [get_spread_object(/*w*/ ctx[1])])
    			: {};

    			workitem.$set(workitem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(workitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(workitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(workitem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(108:3) {#each work as w}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let section;
    	let div0;
    	let h20;
    	let t0;
    	let t1;
    	let p0;
    	let t2;
    	let t3;
    	let p1;
    	let t4;
    	let t5;
    	let h3;
    	let t6;
    	let t7;
    	let p2;
    	let t8;
    	let t9;
    	let p3;
    	let t10;
    	let strong0;
    	let t11;
    	let t12;
    	let strong1;
    	let t13;
    	let t14;
    	let strong2;
    	let t15;
    	let t16;
    	let strong3;
    	let t17;
    	let t18;
    	let strong4;
    	let t19;
    	let t20;
    	let t21;
    	let p4;
    	let t22;
    	let t23;
    	let div1;
    	let h21;
    	let t24;
    	let t25;
    	let ul;
    	let current;
    	let each_value = /*work*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			section = element("section");
    			div0 = element("div");
    			h20 = element("h2");
    			t0 = text("Hi. I'm Ryan.");
    			t1 = space();
    			p0 = element("p");
    			t2 = text("I've spent my career in communications — specifically, the information\n\t\t\tcommunications business. Through information visualization, writing, editing and\n\t\t\tux design, I find the important messages and express them in the best ways\n\t\t\tpossible. Sometimes all it takes is a few carefully chosen words. More often,\n\t\t\thowever, the effort involves distilling mountains of information into meaningful\n\t\t\tand enjoyable experiences. This makes repeat customers out of media consumers.");
    			t3 = space();
    			p1 = element("p");
    			t4 = text("It's important to know when to collaborate, delegate and run solo. Success\n\t\t\trequires juggling the needs of multiple audiences on multiple platforms, and being\n\t\t\ta quick study doesn't hurt either. (All while on deadline, of course.)");
    			t5 = space();
    			h3 = element("h3");
    			t6 = text("How I work");
    			t7 = space();
    			p2 = element("p");
    			t8 = text("For starters, I work well with others. As a group, we need to discover our true\n\t\t\tgoals, define them clearly, and consider our resources. A well-scoped project is\n\t\t\timportant to success and I always try to do things the \"right way\" within that\n\t\t\tscope. This includes accessible design and construction of web experiences.\n\t\t\tInclusivity is not an option.");
    			t9 = space();
    			p3 = element("p");
    			t10 = text("I speak fluent front-end: ");
    			strong0 = element("strong");
    			t11 = text("HTML");
    			t12 = text(", ");
    			strong1 = element("strong");
    			t13 = text("CSS");
    			t14 = text(" and\n\t\t\t");
    			strong2 = element("strong");
    			t15 = text("Javascript");
    			t16 = text(". I can get around with ");
    			strong3 = element("strong");
    			t17 = text("Python");
    			t18 = text(" and\n\t\t\t");
    			strong4 = element("strong");
    			t19 = text("Go");
    			t20 = text(". I'm a big fan of the SvelteJS framework. I also know others\n\t\t\t(including Wordpress). I like Github Actions and using Google as an ad-hoc CMS.");
    			t21 = space();
    			p4 = element("p");
    			t22 = text("I like to document things. It's important and future me needs a lot of help.");
    			t23 = space();
    			div1 = element("div");
    			h21 = element("h2");
    			t24 = text("Experience");
    			t25 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			this.h();
    		},
    		l: function claim(nodes) {
    			section = claim_element(nodes, "SECTION", { "aria-labelledby": true, class: true });
    			var section_nodes = children(section);
    			div0 = claim_element(section_nodes, "DIV", { class: true });
    			var div0_nodes = children(div0);
    			h20 = claim_element(div0_nodes, "H2", { id: true, class: true });
    			var h20_nodes = children(h20);
    			t0 = claim_text(h20_nodes, "Hi. I'm Ryan.");
    			h20_nodes.forEach(detach_dev);
    			t1 = claim_space(div0_nodes);
    			p0 = claim_element(div0_nodes, "P", {});
    			var p0_nodes = children(p0);
    			t2 = claim_text(p0_nodes, "I've spent my career in communications — specifically, the information\n\t\t\tcommunications business. Through information visualization, writing, editing and\n\t\t\tux design, I find the important messages and express them in the best ways\n\t\t\tpossible. Sometimes all it takes is a few carefully chosen words. More often,\n\t\t\thowever, the effort involves distilling mountains of information into meaningful\n\t\t\tand enjoyable experiences. This makes repeat customers out of media consumers.");
    			p0_nodes.forEach(detach_dev);
    			t3 = claim_space(div0_nodes);
    			p1 = claim_element(div0_nodes, "P", {});
    			var p1_nodes = children(p1);
    			t4 = claim_text(p1_nodes, "It's important to know when to collaborate, delegate and run solo. Success\n\t\t\trequires juggling the needs of multiple audiences on multiple platforms, and being\n\t\t\ta quick study doesn't hurt either. (All while on deadline, of course.)");
    			p1_nodes.forEach(detach_dev);
    			t5 = claim_space(div0_nodes);
    			h3 = claim_element(div0_nodes, "H3", { class: true });
    			var h3_nodes = children(h3);
    			t6 = claim_text(h3_nodes, "How I work");
    			h3_nodes.forEach(detach_dev);
    			t7 = claim_space(div0_nodes);
    			p2 = claim_element(div0_nodes, "P", {});
    			var p2_nodes = children(p2);
    			t8 = claim_text(p2_nodes, "For starters, I work well with others. As a group, we need to discover our true\n\t\t\tgoals, define them clearly, and consider our resources. A well-scoped project is\n\t\t\timportant to success and I always try to do things the \"right way\" within that\n\t\t\tscope. This includes accessible design and construction of web experiences.\n\t\t\tInclusivity is not an option.");
    			p2_nodes.forEach(detach_dev);
    			t9 = claim_space(div0_nodes);
    			p3 = claim_element(div0_nodes, "P", {});
    			var p3_nodes = children(p3);
    			t10 = claim_text(p3_nodes, "I speak fluent front-end: ");
    			strong0 = claim_element(p3_nodes, "STRONG", {});
    			var strong0_nodes = children(strong0);
    			t11 = claim_text(strong0_nodes, "HTML");
    			strong0_nodes.forEach(detach_dev);
    			t12 = claim_text(p3_nodes, ", ");
    			strong1 = claim_element(p3_nodes, "STRONG", {});
    			var strong1_nodes = children(strong1);
    			t13 = claim_text(strong1_nodes, "CSS");
    			strong1_nodes.forEach(detach_dev);
    			t14 = claim_text(p3_nodes, " and\n\t\t\t");
    			strong2 = claim_element(p3_nodes, "STRONG", {});
    			var strong2_nodes = children(strong2);
    			t15 = claim_text(strong2_nodes, "Javascript");
    			strong2_nodes.forEach(detach_dev);
    			t16 = claim_text(p3_nodes, ". I can get around with ");
    			strong3 = claim_element(p3_nodes, "STRONG", {});
    			var strong3_nodes = children(strong3);
    			t17 = claim_text(strong3_nodes, "Python");
    			strong3_nodes.forEach(detach_dev);
    			t18 = claim_text(p3_nodes, " and\n\t\t\t");
    			strong4 = claim_element(p3_nodes, "STRONG", {});
    			var strong4_nodes = children(strong4);
    			t19 = claim_text(strong4_nodes, "Go");
    			strong4_nodes.forEach(detach_dev);
    			t20 = claim_text(p3_nodes, ". I'm a big fan of the SvelteJS framework. I also know others\n\t\t\t(including Wordpress). I like Github Actions and using Google as an ad-hoc CMS.");
    			p3_nodes.forEach(detach_dev);
    			t21 = claim_space(div0_nodes);
    			p4 = claim_element(div0_nodes, "P", {});
    			var p4_nodes = children(p4);
    			t22 = claim_text(p4_nodes, "I like to document things. It's important and future me needs a lot of help.");
    			p4_nodes.forEach(detach_dev);
    			div0_nodes.forEach(detach_dev);
    			t23 = claim_space(section_nodes);
    			div1 = claim_element(section_nodes, "DIV", { class: true });
    			var div1_nodes = children(div1);
    			h21 = claim_element(div1_nodes, "H2", { class: true });
    			var h21_nodes = children(h21);
    			t24 = claim_text(h21_nodes, "Experience");
    			h21_nodes.forEach(detach_dev);
    			t25 = claim_space(div1_nodes);
    			ul = claim_element(div1_nodes, "UL", { class: true });
    			var ul_nodes = children(ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].l(ul_nodes);
    			}

    			ul_nodes.forEach(detach_dev);
    			div1_nodes.forEach(detach_dev);
    			section_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(h20, "id", "about-header");
    			attr_dev(h20, "class", "header header--intro svelte-1uk0pfi");
    			add_location(h20, file$1, 73, 2, 2030);
    			add_location(p0, file$1, 74, 2, 2102);
    			add_location(p1, file$1, 82, 2, 2598);
    			attr_dev(h3, "class", "header");
    			add_location(h3, file$1, 88, 2, 2850);
    			add_location(p2, file$1, 89, 2, 2887);
    			add_location(strong0, file$1, 97, 29, 3294);
    			add_location(strong1, file$1, 97, 52, 3317);
    			add_location(strong2, file$1, 98, 3, 3345);
    			add_location(strong3, file$1, 98, 54, 3396);
    			add_location(strong4, file$1, 99, 3, 3427);
    			add_location(p3, file$1, 96, 2, 3261);
    			add_location(p4, file$1, 102, 2, 3600);
    			attr_dev(div0, "class", "bio stack svelte-1uk0pfi");
    			add_location(div0, file$1, 72, 1, 2004);
    			attr_dev(h21, "class", "header");
    			add_location(h21, file$1, 105, 2, 3714);
    			attr_dev(ul, "class", "work__list stack svelte-1uk0pfi");
    			add_location(ul, file$1, 106, 2, 3751);
    			attr_dev(div1, "class", "work svelte-1uk0pfi");
    			add_location(div1, file$1, 104, 1, 3693);
    			attr_dev(section, "aria-labelledby", "about-header");
    			attr_dev(section, "class", "about container svelte-1uk0pfi");
    			add_location(section, file$1, 71, 0, 1938);
    		},
    		m: function mount(target, anchor) {
    			insert_hydration_dev(target, section, anchor);
    			append_hydration_dev(section, div0);
    			append_hydration_dev(div0, h20);
    			append_hydration_dev(h20, t0);
    			append_hydration_dev(div0, t1);
    			append_hydration_dev(div0, p0);
    			append_hydration_dev(p0, t2);
    			append_hydration_dev(div0, t3);
    			append_hydration_dev(div0, p1);
    			append_hydration_dev(p1, t4);
    			append_hydration_dev(div0, t5);
    			append_hydration_dev(div0, h3);
    			append_hydration_dev(h3, t6);
    			append_hydration_dev(div0, t7);
    			append_hydration_dev(div0, p2);
    			append_hydration_dev(p2, t8);
    			append_hydration_dev(div0, t9);
    			append_hydration_dev(div0, p3);
    			append_hydration_dev(p3, t10);
    			append_hydration_dev(p3, strong0);
    			append_hydration_dev(strong0, t11);
    			append_hydration_dev(p3, t12);
    			append_hydration_dev(p3, strong1);
    			append_hydration_dev(strong1, t13);
    			append_hydration_dev(p3, t14);
    			append_hydration_dev(p3, strong2);
    			append_hydration_dev(strong2, t15);
    			append_hydration_dev(p3, t16);
    			append_hydration_dev(p3, strong3);
    			append_hydration_dev(strong3, t17);
    			append_hydration_dev(p3, t18);
    			append_hydration_dev(p3, strong4);
    			append_hydration_dev(strong4, t19);
    			append_hydration_dev(p3, t20);
    			append_hydration_dev(div0, t21);
    			append_hydration_dev(div0, p4);
    			append_hydration_dev(p4, t22);
    			append_hydration_dev(section, t23);
    			append_hydration_dev(section, div1);
    			append_hydration_dev(div1, h21);
    			append_hydration_dev(h21, t24);
    			append_hydration_dev(div1, t25);
    			append_hydration_dev(div1, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*work*/ 1) {
    				each_value = /*work*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ul, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('About', slots, []);

    	const work = [
    		{
    			start: 2017,
    			end: "present",
    			org: "Gannett",
    			orgLink: "https://www.usatoday.com/",
    			role: "Storytelling developer",
    			description: "The Gannett Storytelling Studio is a skunkworks-like team who work on narrative experiences that fall outside the tradition article or photograph. We collaborate with newsrooms across the country to do journalism with our own custom-built tools, frameworks and ad-hoc applications."
    		},
    		{
    			start: 2010,
    			end: 2017,
    			org: "Chicago Tribune",
    			orgLink: "https://www.chicagotribune.com/",
    			role: "Assistant DataViz Editor, Graphic reporter",
    			description: "Developed digital online experiences, and even a few custom-built investigation articles, for news, sports, business, features and beyond. I was central to developing our team's digital strategy and technology stack."
    		},
    		{
    			start: 2005,
    			end: 2010,
    			org: "The Times of Northwest Indiana",
    			orgLink: "https://www.nwi.com/",
    			role: "Designer, Graphics Editor",
    			description: "I designed newspaper pages and graphics for all sections and contributed digital presentation and graphics (expecially around election time). "
    		},
    		{
    			start: 2002,
    			end: 2005,
    			orgLink: "https://www.thenewsenterprise.com/",
    			org: "The News-Enterprise",
    			role: "Copy editor, Presentation Editor",
    			description: "I designed newspaper pages and graphics for all sections, edited copy and helped coordinate entertainment coverage "
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<About> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ WorkItem, work });
    	return [work];
    }

    class About extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "About",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/components/Portfolio.svelte generated by Svelte v3.53.1 */

    const file = "src/components/Portfolio.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i].label;
    	child_ctx[3] = list[i].description;
    	child_ctx[4] = list[i].image;
    	child_ctx[5] = list[i].links !== undefined ? list[i].links : [];
    	child_ctx[6] = list[i].repo !== undefined ? list[i].repo : null;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i].headline;
    	child_ctx[10] = list[i].link;
    	return child_ctx;
    }

    // (351:4) {#if repo}
    function create_if_block_1(ctx) {
    	let a;
    	let span;
    	let svg;
    	let title;
    	let t0;
    	let use;
    	let t1;

    	const block = {
    		c: function create() {
    			a = element("a");
    			span = element("span");
    			svg = svg_element("svg");
    			title = svg_element("title");
    			t0 = text("Github logo");
    			use = svg_element("use");
    			t1 = text("\n\t\t\t\t\t\tSee the code");
    			this.h();
    		},
    		l: function claim(nodes) {
    			a = claim_element(nodes, "A", { class: true, href: true });
    			var a_nodes = children(a);
    			span = claim_element(a_nodes, "SPAN", { class: true });
    			var span_nodes = children(span);
    			svg = claim_svg_element(span_nodes, "svg", { class: true });
    			var svg_nodes = children(svg);
    			title = claim_svg_element(svg_nodes, "title", {});
    			var title_nodes = children(title);
    			t0 = claim_text(title_nodes, "Github logo");
    			title_nodes.forEach(detach_dev);
    			use = claim_svg_element(svg_nodes, "use", { href: true });
    			children(use).forEach(detach_dev);
    			svg_nodes.forEach(detach_dev);
    			span_nodes.forEach(detach_dev);
    			t1 = claim_text(a_nodes, "\n\t\t\t\t\t\tSee the code");
    			a_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			add_location(title, file, 354, 8, 16027);
    			attr_dev(use, "href", "#github");
    			add_location(use, file, 355, 8, 16062);
    			attr_dev(svg, "class", "svelte-ddgro8");
    			add_location(svg, file, 353, 7, 16013);
    			attr_dev(span, "class", "project__repo__icon svelte-ddgro8");
    			add_location(span, file, 352, 6, 15971);
    			attr_dev(a, "class", "project__repo sans-serif svelte-ddgro8");
    			attr_dev(a, "href", /*repo*/ ctx[6]);
    			add_location(a, file, 351, 5, 15916);
    		},
    		m: function mount(target, anchor) {
    			insert_hydration_dev(target, a, anchor);
    			append_hydration_dev(a, span);
    			append_hydration_dev(span, svg);
    			append_hydration_dev(svg, title);
    			append_hydration_dev(title, t0);
    			append_hydration_dev(svg, use);
    			append_hydration_dev(a, t1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(351:4) {#if repo}",
    		ctx
    	});

    	return block;
    }

    // (362:4) {#if links.length > 1}
    function create_if_block(ctx) {
    	let h4;
    	let t;

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			t = text("Examples:");
    			this.h();
    		},
    		l: function claim(nodes) {
    			h4 = claim_element(nodes, "H4", { class: true });
    			var h4_nodes = children(h4);
    			t = claim_text(h4_nodes, "Examples:");
    			h4_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(h4, "class", "sublabel");
    			add_location(h4, file, 362, 5, 16184);
    		},
    		m: function mount(target, anchor) {
    			insert_hydration_dev(target, h4, anchor);
    			append_hydration_dev(h4, t);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(362:4) {#if links.length > 1}",
    		ctx
    	});

    	return block;
    }

    // (366:5) {#each links as { headline, link }}
    function create_each_block_1(ctx) {
    	let li;
    	let a;
    	let t0_value = (/*headline*/ ctx[9] || /*link*/ ctx[10]) + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			li = element("li");
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = space();
    			this.h();
    		},
    		l: function claim(nodes) {
    			li = claim_element(nodes, "LI", { class: true });
    			var li_nodes = children(li);

    			a = claim_element(li_nodes, "A", {
    				class: true,
    				target: true,
    				rel: true,
    				href: true
    			});

    			var a_nodes = children(a);
    			t0 = claim_text(a_nodes, t0_value);
    			a_nodes.forEach(detach_dev);
    			t1 = claim_space(li_nodes);
    			li_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(a, "class", "link sans-serif svelte-ddgro8");
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "rel", "noopener noreferrer");
    			attr_dev(a, "href", /*link*/ ctx[10]);
    			add_location(a, file, 367, 7, 16312);
    			attr_dev(li, "class", "svelte-ddgro8");
    			add_location(li, file, 366, 6, 16300);
    		},
    		m: function mount(target, anchor) {
    			insert_hydration_dev(target, li, anchor);
    			append_hydration_dev(li, a);
    			append_hydration_dev(a, t0);
    			append_hydration_dev(li, t1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(366:5) {#each links as { headline, link }}",
    		ctx
    	});

    	return block;
    }

    // (338:2) {#each portfolio as { label, description, image, links = [], repo = null }}
    function create_each_block(ctx) {
    	let li;
    	let div;
    	let img;
    	let img_src_value;
    	let t0;
    	let h3;
    	let t1_value = /*label*/ ctx[2] + "";
    	let t1;
    	let t2;
    	let p;
    	let raw_value = /*description*/ ctx[3] + "";
    	let t3;
    	let t4;
    	let t5;
    	let ul;
    	let t6;
    	let if_block0 = /*repo*/ ctx[6] && create_if_block_1(ctx);
    	let if_block1 = /*links*/ ctx[5].length > 1 && create_if_block(ctx);
    	let each_value_1 = /*links*/ ctx[5];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			div = element("div");
    			img = element("img");
    			t0 = space();
    			h3 = element("h3");
    			t1 = text(t1_value);
    			t2 = space();
    			p = element("p");
    			t3 = space();
    			if (if_block0) if_block0.c();
    			t4 = space();
    			if (if_block1) if_block1.c();
    			t5 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t6 = space();
    			this.h();
    		},
    		l: function claim(nodes) {
    			li = claim_element(nodes, "LI", { class: true });
    			var li_nodes = children(li);
    			div = claim_element(li_nodes, "DIV", { class: true });
    			var div_nodes = children(div);

    			img = claim_element(div_nodes, "IMG", {
    				class: true,
    				src: true,
    				alt: true,
    				loading: true,
    				height: true,
    				width: true
    			});

    			div_nodes.forEach(detach_dev);
    			t0 = claim_space(li_nodes);
    			h3 = claim_element(li_nodes, "H3", { class: true });
    			var h3_nodes = children(h3);
    			t1 = claim_text(h3_nodes, t1_value);
    			h3_nodes.forEach(detach_dev);
    			t2 = claim_space(li_nodes);
    			p = claim_element(li_nodes, "P", {});
    			var p_nodes = children(p);
    			p_nodes.forEach(detach_dev);
    			t3 = claim_space(li_nodes);
    			if (if_block0) if_block0.l(li_nodes);
    			t4 = claim_space(li_nodes);
    			if (if_block1) if_block1.l(li_nodes);
    			t5 = claim_space(li_nodes);
    			ul = claim_element(li_nodes, "UL", { class: true });
    			var ul_nodes = children(ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].l(ul_nodes);
    			}

    			ul_nodes.forEach(detach_dev);
    			t6 = claim_space(li_nodes);
    			li_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(img, "class", "project__image__img svelte-ddgro8");
    			if (!src_url_equal(img.src, img_src_value = "thumbs/" + /*image*/ ctx[4])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "loading", "lazy");
    			attr_dev(img, "height", "9");
    			attr_dev(img, "width", "16");
    			add_location(img, file, 340, 5, 15682);
    			attr_dev(div, "class", "project__image svelte-ddgro8");
    			add_location(div, file, 339, 4, 15648);
    			attr_dev(h3, "class", "label");
    			add_location(h3, file, 348, 4, 15834);
    			add_location(p, file, 349, 4, 15869);
    			attr_dev(ul, "class", "links svelte-ddgro8");
    			add_location(ul, file, 364, 4, 16234);
    			attr_dev(li, "class", "project stack");
    			add_location(li, file, 338, 3, 15617);
    		},
    		m: function mount(target, anchor) {
    			insert_hydration_dev(target, li, anchor);
    			append_hydration_dev(li, div);
    			append_hydration_dev(div, img);
    			append_hydration_dev(li, t0);
    			append_hydration_dev(li, h3);
    			append_hydration_dev(h3, t1);
    			append_hydration_dev(li, t2);
    			append_hydration_dev(li, p);
    			p.innerHTML = raw_value;
    			append_hydration_dev(li, t3);
    			if (if_block0) if_block0.m(li, null);
    			append_hydration_dev(li, t4);
    			if (if_block1) if_block1.m(li, null);
    			append_hydration_dev(li, t5);
    			append_hydration_dev(li, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			append_hydration_dev(li, t6);
    		},
    		p: function update(ctx, dirty) {
    			if (/*repo*/ ctx[6]) if_block0.p(ctx, dirty);

    			if (dirty & /*portfolio*/ 1) {
    				each_value_1 = /*links*/ ctx[5];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(338:2) {#each portfolio as { label, description, image, links = [], repo = null }}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let section;
    	let h2;
    	let t0;
    	let t1;
    	let p;
    	let t2;
    	let t3;
    	let ul;
    	let each_value = /*portfolio*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			section = element("section");
    			h2 = element("h2");
    			t0 = text("Selected work");
    			t1 = space();
    			p = element("p");
    			t2 = text(sublabel);
    			t3 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			this.h();
    		},
    		l: function claim(nodes) {
    			section = claim_element(nodes, "SECTION", {
    				id: true,
    				class: true,
    				"aria-labelledby": true
    			});

    			var section_nodes = children(section);
    			h2 = claim_element(section_nodes, "H2", { id: true, class: true });
    			var h2_nodes = children(h2);
    			t0 = claim_text(h2_nodes, "Selected work");
    			h2_nodes.forEach(detach_dev);
    			t1 = claim_space(section_nodes);
    			p = claim_element(section_nodes, "P", { class: true });
    			var p_nodes = children(p);
    			t2 = claim_text(p_nodes, sublabel);
    			p_nodes.forEach(detach_dev);
    			t3 = claim_space(section_nodes);
    			ul = claim_element(section_nodes, "UL", { class: true });
    			var ul_nodes = children(ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].l(ul_nodes);
    			}

    			ul_nodes.forEach(detach_dev);
    			section_nodes.forEach(detach_dev);
    			this.h();
    		},
    		h: function hydrate() {
    			attr_dev(h2, "id", "portfolio-header");
    			attr_dev(h2, "class", "header");
    			add_location(h2, file, 334, 1, 15417);
    			attr_dev(p, "class", "sublabel");
    			add_location(p, file, 335, 1, 15478);
    			attr_dev(ul, "class", "projects svelte-ddgro8");
    			add_location(ul, file, 336, 1, 15514);
    			attr_dev(section, "id", "portfolio");
    			attr_dev(section, "class", "container");
    			attr_dev(section, "aria-labelledby", "portfolio-header");
    			add_location(section, file, 333, 0, 15338);
    		},
    		m: function mount(target, anchor) {
    			insert_hydration_dev(target, section, anchor);
    			append_hydration_dev(section, h2);
    			append_hydration_dev(h2, t0);
    			append_hydration_dev(section, t1);
    			append_hydration_dev(section, p);
    			append_hydration_dev(p, t2);
    			append_hydration_dev(section, t3);
    			append_hydration_dev(section, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*portfolio*/ 1) {
    				each_value = /*portfolio*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const sublabel = "Projects to which I made significant contributions";

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Portfolio', slots, []);

    	const portfolio = [
    		{
    			image: "design-a-kit.png",
    			label: "World Cup: Design your own uniform",
    			repo: "https://github.com/ryanbmarx/design-a-world-cup-kit",
    			links: [
    				{
    					headline: "Design a World Cup 2022 kit",
    					link: "https://www.usatoday.com/storytelling/world-cup-jersey-design-your-own/"
    				}
    			],
    			description: "I designed the initial wireframes and, eventually, developed this web app, with a focus on scaffolding and UX. I worked with two other developers to incorporate the 3D modeling. Optimizing the mobile performance was a challenge, given the sheer volume of patterns/textures and other related files needed to make this a fun experience."
    		},
    		{
    			image: "decider.png",
    			label: "The decider: A polar decision matrix",
    			description: 'In the run-up to the 2022 midterm elections, we were approached by multiple newsrooms looking to help undecided voters choose their candidates. I designed and developed this application which presents a series of prompts from user-selected topics. Responses to the prompts are categorized, and "agreement" is calculated.',
    			links: [
    				{
    					headline: "Raphael Warnock or Herschel Walker? See which candidate is your closest match ",
    					link: "https://www.savannahnow.com/storytelling/herschel-walker-raphael-warnock-georgia-senate-candidate-how-choose/"
    				},
    				{
    					headline: "How conservative are you?",
    					link: "https://www.usatoday.com/storytelling/find-out-how-conservative-you-really-are/"
    				}
    			]
    		},
    		{
    			image: "quiz.png",
    			label: "The USA TODAY News Quiz",
    			links: [
    				{
    					headline: "Test your knowledge with the USA TODAY news quiz",
    					link: "https://www.usatoday.com/storytelling/weekly-news-quiz/"
    				},
    				{
    					headline: "Quiz: How well do you know the Sibley's building in downtown Rochester?",
    					link: "https://www.democratandchronicle.com/storytelling/sibley-building-downtown-rochester-ny-quiz/"
    				}
    			],
    			description: "Sometimes the news can and should be fun. Part of our ongoing 'news play' experiments, this quiz framework has been used to create topical and evergreen quizzes for 6 different news properties, and has been published weekly  by USA TODAY for more than two years. The primary business goals of this project was to drive reader registrations (not subscriptions). Thousands of quiztakers visited Gannett sign-up pages. To encourage habitual quiztaking, this frameworks supports the possibility of two different leaderboards — weekly and all-time — as well as syndication across Gannett properties."
    		},
    		{
    			label: "Cast of Characters",
    			image: "cast.png",
    			links: [
    				{
    					headline: "Meet the Teams: USA, Mexico and Canada",
    					link: "https://www.usatoday.com/storytelling/grid/world-cup-2022-mens-roster-usa-mexico-canada/"
    				},
    				{
    					headline: "Dozens of election-denying candidates are running for office in seven swing states. Here's what they've said or done.",
    					link: "https://www.usatoday.com/storytelling/grid/election-deniers-running-for-office-2022/"
    				},
    				{
    					headline: "Ohio Statehouse Corruption: Who you need to know in the federal bribery case",
    					link: "https://www.cincinnati.com/storytelling/news/ohio-corruption-project/"
    				}
    			],
    			description: "A developer friend-of-the-team asked us for help with the persistent need to make a \"Who's who\" dictionary of people for large investigative projects. We designed this page and built out a framework that pulls data from a Google spreadsheet and enriches it with some organizational tools and filtering/searching. We've tracked Capitol rioters, corrupt ohio officials and colleges that cheat. It's been used to display violence databases and sports rankings and has more configurable features than anything else I've made. There are about 30 published instances."
    		},
    		{
    			label: "In-Depth",
    			image: "indepth.jpg",
    			links: [
    				{
    					headline: "Hallowed Sound, Vol. 2: Stories of perseverance and preservation from the American South",
    					link: "https://www.tennessean.com/in-depth/entertainment/music/2021/09/23/hallowed-sound-stories-perseverance-preservation-american-south-music/5617513001/"
    				},
    				{
    					headline: "A look at the stadiums where teams will compete in the 2022 FIFA World Cup in Qatar",
    					link: "https://www.usatoday.com/in-depth/graphics/2022/11/18/how-many-stadiums-does-qatar-2022-have-mapping-out-world-cup/8305335001/"
    				},
    				{
    					headline: "Meet the Black dancer who broke the Rockettes' color barrier",
    					link: "https://www.lohud.com/in-depth/news/2022/11/17/jennifer-jones-rockette-radio-city-music-hall/69616543007/"
    				}
    			],
    			description: "My team at Gannett is responsible for designing, engineering and maintaining the In-Depth article framework. This collection of tools enables more than 100 web producers across the company to craft visually stunning, reader-focused multimedia presentations using the everyday CMS and our own story editor.\n\nIt's been used to create more than 7,500 (as of December 2022) articles often representing the strongest, most impactful journalism the Gannett has to offer. It has generated hundreds of thousands of pageviews, a 2x increase in engaged time over standard templates and frequently leads to subscriber conversions."
    		},
    		{
    			label: "In-depth: Audiograms",
    			image: "audiogram.png",
    			links: [
    				{
    					headline: "Opinion — Black lives matter: We must live up to Declaration of Independence’s promise",
    					link: "https://www.northjersey.com/in-depth/opinion/2020/07/02/black-lives-matter-trump-declaration-of-independence-2020/3256925001/"
    				},
    				{
    					headline: "'El Paso gave me the values I have': Black leaders emerge from a Hispanic majority border city.",
    					link: "https://www.elpasotimes.com/in-depth/news/2021/03/30/meet-black-leaders-emerged-el-paso-texas-hispanic-majority-city/4578132001/"
    				},
    				{
    					headline: "'They are not alone': Hispanic domestic abuse survivors speak out to help other victims",
    					link: "https://www.oklahoman.com/in-depth/news/2021/08/31/hispanic-domestic-abuse-survivors-speak-out-help-other-victims/7497178002/"
    				}
    			],
    			description: "This component for the In-Depth toolbox was our second-pass at audio clips. I designed and developed this from scratch as an attempt to grow the poor interaction rates observed with the first version. It's bigger and bolder — more pixels on the page — and has a strong visual presence."
    		},
    		{
    			label: "In-depth: SMS emulator",
    			links: [
    				{
    					headline: "The Girl Collector: The story of Cody Jackson and the 16 girls who were his quarry",
    					link: "https://www.cincinnati.com/in-depth/news/2018/10/21/girl-collector-cincinnati-cody-jackson/1409756002/"
    				},
    				{
    					headline: "He murdered three women and was hunting a fourth. These women outsmarted a serial killer",
    					link: "https://www.northjersey.com/in-depth/news/crime/2020/02/03/how-group-women-stopped-nj-serial-killer/2661900001/"
    				},
    				{
    					headline: "A fiery crash shattered four lives. 20 years later, their connection yields serenity.",
    					link: "https://www.desmoinesregister.com/in-depth/news/local/columnists/courtney-crowder/2019/11/26/abbie-kampman-iowa-strangers-find-peace-20-years-after-wrong-way-crash-kills-5-mother-sisters/2570864001/"
    				}
    			],
    			image: "sms.png",
    			description: "This component from the In-Depth toolbox is a top-to-bottom refactor of an existing app. Originally written in Angular (with the data hard-coded into the application), I rewrote it in our preferred Svelte, and abstracted the input data so that it could be used in any project. Visually, it uses the same CSS styling variables as the broader article stylesheets, so it adapts to existing "
    		},
    		{
    			label: "In-depth: Sliders",
    			image: "slider.jpg",
    			links: [
    				{
    					headline: "Modernizing images of long-ago Billerica",
    					link: "https://www.wickedlocal.com/in-depth/billerica-minuteman/2021/12/27/bilerica-ma-kevin-murphy-photo-restoration-colorization-historical-pictures/6416979001/"
    				},
    				{
    					headline: "Lane County relies on same alert tools used during Holiday Farm Fire, but when emergency strikes, residents always will have to help each other.",
    					link: "https://www.registerguard.com/in-depth/news/2021/08/26/holiday-farm-fire-emergency-warning-system-residents-help-crucial/8102205002/"
    				},
    				{
    					headline: "Picture this: Eye-opening images of what climate change has done and could do to our world",
    					link: "https://www.usatoday.com/in-depth/graphics/2021/07/07/climate-change-images-offer-present-and-future-views-our-world/5173622001/"
    				}
    			],
    			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    		},
    		{
    			label: "FAQs but better: The Big Page of Help",
    			image: "bpoh.png",
    			links: [
    				{
    					headline: "Your guide to coronavirus and COVID-19",
    					link: "https://www.usatoday.com/storytelling/covid19-coronavirus-resource-guide/"
    				},
    				{
    					headline: "How to get help in Milwaukee",
    					link: "https://www.jsonline.com/storytelling/milwaukee-resources-guide-housing-mental-health-education-public-safety-voting-employment-recycling/"
    				},
    				{
    					headline: "The ultimate Palm Beach County voter guide to the November 2022 election",
    					link: "https://www.palmbeachpost.com/storytelling/palm-beach-florida-election-voters-guide-2022/"
    				}
    			],
    			description: "This concept was born in the early days of the Covid-19 pandemic. Our readers had lots of questions and needed easy access to the answers. Gannett was covering the heck out of the ordeal, but organizing that content in ways satisfy these specific, informational needs was difficult. Enter the big page of help.\n\nConstructed with SEO as a top priority, these experiences are intuitive and transactional. Individual questions are grouped by topic, and each question, by design, has an answer with more information available if desired.\n\nThe concept has been adapted for civic resources, hurricane preparedness and voting."
    		},
    		{
    			label: "Wildfire lookup",
    			image: "wildfire.png",
    			links: [
    				{
    					headline: "Wildfire risks: Look up every Western community",
    					link: "https://www.azcentral.com/storytelling/wildfires-risks-map-california-arizona-oregon/"
    				},
    				{
    					headline: "Where will the West's next deadly wildfire strike? The risks are everywhere",
    					link: "https://www.azcentral.com/in-depth/news/local/arizona-wildfires/2019/07/22/wildfire-risks-more-than-500-spots-have-greater-hazard-than-paradise/1434502001/"
    				}
    			],
    			description: "This collaboration with the Arizona Republic and the USA TODAY graphics team is a custom-build interface for a custom-built database of wildfire potential in the U.S. west. Each town is measured by a series of metrics calculating the probability that it could be consumed by wildfire. The application had a standalone instance with it's own URL, but it also was embedded into a handful of articles (built using the In-Depth framework) and pre-configured to display specific towns."
    		},
    		{
    			label: "Covituaries",
    			image: "covituaries.png",
    			links: [
    				{
    					headline: "Detroit Free Press: We will remember",
    					link: "https://www.freep.com/storytelling/coronavirus-obituaries-michigan/"
    				},
    				{
    					headline: "Loved and Lost: Remembering our NJ family, friends and neighbors taken by coronavirus",
    					link: "https://www.usatoday.com/storytelling/nj-coronavirus-deaths/"
    				},
    				{
    					headline: "Telling the stories of those who died in the Champlain Towers collapse in Surfside, Florida",
    					link: "https://www.palmbeachpost.com/storytelling/news/surfside-miami-florida-building-collapse-victims-who-died-obituaries/"
    				}
    			],
    			description: "The Covid-19 pandemic claimed at least 1.1 million Americans, and at least 6.6 million worldwide. This presentation was developed in conjunction with a newsroom in New Jersey as an artful, elegant and respectful way  to display the names of people who had died in the pandemic. It was adapted for use in Detroit and south Florida  for similar purposes."
    		},
    		{
    			label: "Cincy neighborhoods",
    			image: "cincy.png",
    			links: [
    				{
    					headline: "A statistical tour of Cincinnati: Breaking down the neighborhoods",
    					link: "https://www.cincinnati.com/storytelling/cincinnati-neighborhoods/"
    				},
    				{
    					headline: "A neighborhood report on Mount Adams",
    					link: "https://www.cincinnati.com/storytelling/cincinnati-neighborhoods/neighborhoods/mount-adams/"
    				},
    				{
    					headline: "A neighborhood comparison: Age, population older than 18",
    					link: "https://www.cincinnati.com/storytelling/cincinnati-neighborhoods/metrics/over-age-18/"
    				}
    			],
    			description: 'A new census brings new data, and we developed this data-explorer microsite with the journalists in Cincinatti who were intent on unpacking claims made by politicians about "the Cincinatti Comeback." This site presents a mountain of the most recent demographic data in two ways: by statistic and by neighborhood. I worked with the journalists to design each of the different views and shared development duties with the entire team. It\'s proven to be a success as it consistently generates traffic/engagement which spikes when new investigative articles publish. '
    		}
    	];

    	const otherStuff = [
    		{
    			label: "The always popular year in photos",
    			image: "fpo.png",
    			links: [{ link: "https://google.com" }],
    			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Portfolio> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ sublabel, portfolio, otherStuff });
    	return [portfolio];
    }

    class Portfolio extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Portfolio",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.53.1 */

    function create_fragment(ctx) {
    	let header;
    	let t0;
    	let contact0;
    	let t1;
    	let about;
    	let t2;
    	let portfolio;
    	let t3;
    	let contact1;
    	let current;
    	header = new Header({ $$inline: true });

    	contact0 = new Contact({
    			props: { label: "Find me here:" },
    			$$inline: true
    		});

    	about = new About({ $$inline: true });
    	portfolio = new Portfolio({ $$inline: true });
    	contact1 = new Contact({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t0 = space();
    			create_component(contact0.$$.fragment);
    			t1 = space();
    			create_component(about.$$.fragment);
    			t2 = space();
    			create_component(portfolio.$$.fragment);
    			t3 = space();
    			create_component(contact1.$$.fragment);
    		},
    		l: function claim(nodes) {
    			claim_component(header.$$.fragment, nodes);
    			t0 = claim_space(nodes);
    			claim_component(contact0.$$.fragment, nodes);
    			t1 = claim_space(nodes);
    			claim_component(about.$$.fragment, nodes);
    			t2 = claim_space(nodes);
    			claim_component(portfolio.$$.fragment, nodes);
    			t3 = claim_space(nodes);
    			claim_component(contact1.$$.fragment, nodes);
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_hydration_dev(target, t0, anchor);
    			mount_component(contact0, target, anchor);
    			insert_hydration_dev(target, t1, anchor);
    			mount_component(about, target, anchor);
    			insert_hydration_dev(target, t2, anchor);
    			mount_component(portfolio, target, anchor);
    			insert_hydration_dev(target, t3, anchor);
    			mount_component(contact1, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(contact0.$$.fragment, local);
    			transition_in(about.$$.fragment, local);
    			transition_in(portfolio.$$.fragment, local);
    			transition_in(contact1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(contact0.$$.fragment, local);
    			transition_out(about.$$.fragment, local);
    			transition_out(portfolio.$$.fragment, local);
    			transition_out(contact1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(contact0, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(about, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(portfolio, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(contact1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Header, Contact, About, Portfolio });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      hydrate: true,
      target: document.getElementById("app"),
      props: {},
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
