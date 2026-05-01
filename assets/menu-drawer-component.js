import { DialogComponent } from '@theme/dialog';

/**
 * Mobile menu drawer.
 *
 * Thin wrapper around Horizon's DialogComponent so the brand header has its
 * own custom element to target via `on:click="menu-drawer-component/showDialog"`.
 * Inherits showDialog / closeDialog / toggleDialog plus body scroll-lock,
 * click-outside, and ESC handling.
 */
class MenuDrawerComponent extends DialogComponent {}

if (!customElements.get('menu-drawer-component')) {
  customElements.define('menu-drawer-component', MenuDrawerComponent);
}
