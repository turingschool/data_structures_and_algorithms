function hexToDecimal(hex){
  if(/[^0-9a-fA-F]/.test(hex)){
    return( null );
  }
  return parseInt(hex, 16);
}