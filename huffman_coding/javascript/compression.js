function Encoder(message) {
  this.message = message;
  this.characterCounts = {};
  this.compressionEfficiency = 1;
  this.originalBitstring = message.split("").map(function(character) {
    return character.charCodeAt().toString(2);
  }).join("");
  this.compressedBitstring = "";
}
