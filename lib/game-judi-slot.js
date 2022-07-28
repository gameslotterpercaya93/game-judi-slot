'use babel';

import GameJudiSlotView from './game-judi-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  gameJudiSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.gameJudiSlotView = new GameJudiSlotView(state.gameJudiSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.gameJudiSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'game-judi-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.gameJudiSlotView.destroy();
  },

  serialize() {
    return {
      gameJudiSlotViewState: this.gameJudiSlotView.serialize()
    };
  },

  toggle() {
    console.log('GameJudiSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
