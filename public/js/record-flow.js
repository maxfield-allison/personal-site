class RecordFlow extends HTMLElement {
    controller;
    effects = [];
    connectedCallback() {
      this.controller?.abort(); this.controller = new AbortController();
      const button = this.querySelector('[data-service-toggle]');
      if (!button) return; button.disabled = false;
      const motion = matchMedia('(prefers-reduced-motion: reduce)');
      const stop = () => { this.effects.forEach(effect => effect.cancel()); this.effects = []; };
      button.addEventListener('click', () => {
        stop(); const added = button.getAttribute('aria-pressed') !== 'true';
        button.setAttribute('aria-pressed', String(added)); button.textContent = added ? 'Remove the example service' : 'Add an example service';
        this.querySelector('[data-owned-record]').textContent = added ? '192.0.2.20 · managed by dnsweaver' : 'No managed record';
        this.querySelector('[data-flow-status]').textContent = added ? 'The managed record was created. The manual record stayed unchanged.' : 'The managed record was removed. The manual record stayed unchanged.';
        if (motion.matches || document.documentElement.classList.contains('response-still')) return;
        this.querySelectorAll('[data-flow-layer]').forEach((layer, index) => {
          this.effects.push(layer.animate([{boxShadow:'0 0 0 0 transparent'},{boxShadow:'0 0 0 2px var(--color-accent)'},{boxShadow:'0 0 0 0 transparent'}], {duration:600, delay:index*130}));
        });
      }, {signal:this.controller.signal});
      motion.addEventListener('change', stop, {signal:this.controller.signal});
      document.addEventListener('visibilitychange', stop, {signal:this.controller.signal});
      document.addEventListener('response:still', stop, {signal:this.controller.signal});
      window.addEventListener('pagehide', stop, {signal:this.controller.signal});
    }
    disconnectedCallback() { this.controller?.abort(); this.effects.forEach(effect => effect.cancel()); this.effects = []; }
  }
  if (!customElements.get('record-flow')) customElements.define('record-flow', RecordFlow);
