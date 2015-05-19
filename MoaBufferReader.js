
var MoaBufferReader = (function(){
  function MoaBufferReader(raw, endian){
    this._endian = (endian=='little'?0:1);
    if(raw){
      this.setRaw(raw);
      console.log('MoaBufferReader', raw.length);
    }
    else{
      console.log('please setRaw later.');
    }
  }
  MoaBufferReader.prototype._read = function(size){
    var _this = this;
    _this._offset = _this._offset + size;
    _this._remain = _this._remain - size;
    _this._curRaw = _this._curRaw.slice(size);
  }
  MoaBufferReader.prototype.readUInt8 = function(){
    var _this = this;
    var buf = _this._raw.readUInt8(_this._offset);
    _this._read(1);
    return buf;
  }
  MoaBufferReader.prototype.readUInt16 = function(){
    var _this = this;
    return (_this._endian?_this.readUInt16BE():_this.readUInt16LE());
  }
  MoaBufferReader.prototype.readUInt16BE = function(){
    var _this = this;
    var buf = _this._raw.readUInt16BE(_this._offset);
    _this._read(2);
    return buf;
  }
  MoaBufferReader.prototype.readUInt16LE = function(){
    var _this = this;
    var buf = _this._raw.readUInt16LE(_this._offset);
    _this._read(2);
    return buf;
  }

  MoaBufferReader.prototype.readUInt32 = function(){
    var _this = this;
    return (_this._endian?_this.readUInt32BE():_this.readUInt32LE());
  }
  MoaBufferReader.prototype.readUInt32BE = function(){
    var _this = this;
    var buf = _this._raw.readUInt32BE(_this._offset);
    _this._read(4);
    return buf;
  }
  MoaBufferReader.prototype.readUInt32LE = function(){
    var _this = this;
    var buf = _this._raw.readUInt32LE(_this._offset);
    _this._read(4);
    return buf;
  }

  MoaBufferReader.prototype.readDouble = function(){
    var _this = this;
    return (_this._endian?_this.readDoubleBE():_this.readDoubleLE());
  }
  MoaBufferReader.prototype.readDoubleBE = function(){
    var _this = this;
    var buf = _this._raw.readDoubleBE(_this._offset);
    _this._read(8);
    return buf;
  }
  MoaBufferReader.prototype.readDoubleLE = function(){
    var _this = this;
    var buf = _this._raw.readDoubleLE(_this._offset);
    _this._read(8);
    return buf;
  }

  MoaBufferReader.prototype.slice = function(size){
    var _this = this;
    var buf;
  //  console.log('slice', _this._offset);
  //  console.log('slice', size);
  //  console.log('slice', _this._raw.length);
    if(_this._offset+size>_this._raw.length){
      throws('no enough size max: '+_this._raw.length);
    }
    else if(_this._offset+size===_this._raw.length){
      buf = _this._raw.slice(_this._offset);
    }
    else{
      buf = _this._raw.slice(_this._offset, _this._offset+size);
    }
    _this._read(size);
    return buf;
  }
  MoaBufferReader.prototype.setRaw = function(raw){
    var _this = this;
    if(!Buffer.isBuffer(raw)) {
      raw  = new Buffer(raw.toString());
    }
    _this._raw = raw;
    _this._curRaw = raw;
    _this._remain = raw.length;
    _this._offset = 0;
  }
  MoaBufferReader.prototype.printOffset = function(){
    console.log('printOffset', _this._offset);
  }
  
  return MoaBufferReader;
})();

module.exports = MoaBufferReader;

