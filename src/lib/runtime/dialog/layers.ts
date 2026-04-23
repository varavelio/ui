/**
 * Base z-index used for dialog and sheet overlays.
 */
const OVERLAY_BASE_Z_INDEX = 40;

/**
 * Base z-index used for dialog and sheet content.
 */
const CONTENT_BASE_Z_INDEX = 50;

/**
 * Z-index distance between consecutive stacked modal layers.
 */
const LAYER_STEP = 20;

class DialogLayerManager {
  /**
   * Tracks the assigned layer for each mounted modal instance.
   */
  private activeLayers = new Map<symbol, number>();

  /**
   * Registers a modal instance and returns its stacking layer.
   *
   * Existing registrations are reused so a mounted dialog keeps a stable layer
   * while it remains open.
   */
  register(key: symbol): number {
    const existingLayer = this.activeLayers.get(key);

    if (existingLayer !== undefined) {
      return existingLayer;
    }

    const nextLayer = this.getNextLayer();
    this.activeLayers.set(key, nextLayer);

    return nextLayer;
  }

  /**
   * Removes a modal instance from the active layer registry.
   */
  unregister(key: symbol): void {
    this.activeLayers.delete(key);
  }

  /**
   * Returns the computed overlay z-index for a given stacking layer.
   */
  overlayZIndex(layer: number): number {
    return OVERLAY_BASE_Z_INDEX + layer * LAYER_STEP;
  }

  /**
   * Returns the computed content z-index for a given stacking layer.
   */
  contentZIndex(layer: number): number {
    return CONTENT_BASE_Z_INDEX + layer * LAYER_STEP;
  }

  /**
   * Computes the next available stacking layer.
   */
  private getNextLayer(): number {
    if (this.activeLayers.size === 0) {
      return 0;
    }

    return Math.max(...this.activeLayers.values()) + 1;
  }
}

/**
 * Shared modal layer manager used by `Dialog` and `Sheet` to keep nested
 * overlays stacked in opening order without changing their public APIs.
 */
export const dialogLayerManager = new DialogLayerManager();
