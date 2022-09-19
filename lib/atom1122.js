'use babel';

import Atom1122View from './atom1122-view';
import { CompositeDisposable } from 'atom';

export default {

  atom1122View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atom1122View = new Atom1122View(state.atom1122ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atom1122View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom1122:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atom1122View.destroy();
  },

  serialize() {
    return {
      atom1122ViewState: this.atom1122View.serialize()
    };
  },

  toggle() {
    console.log('Atom1122 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
