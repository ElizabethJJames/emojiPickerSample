import React from 'react';
import './App.css';

import EmojiPicker from "./emojiPicker.js";

import EmojiList from "./emojiList.js";

const emojiSelection = function(emoji){console.log(emoji); alert(emoji.char);};


function App() {

  return (
    <EmojiPicker
        cbEmojiSelection = {emojiSelection}
    />

  );
}

export default App;
