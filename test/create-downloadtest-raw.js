var fs = require('fs');
var path = require('path');
var streamBuffers = require('stream-buffers');

const TEST_FILE_MB_SIZE = 2;

var megabytes = function(mb){
  return mb * 1024 * 1024;
};

var buf = Buffer.alloc(megabytes(TEST_FILE_MB_SIZE), 0, 'binary');
var readableBuffer = new streamBuffers.ReadableStreamBuffer({
    frequency: 10,
    chunkSize: 2048
});
readableBuffer.put(buf);
var testRaw = fs.createWriteStream(path.join(__dirname, 'raw', 'downloadtest.raw' ));

testRaw.on('pipe', function(){
  process.stdout.write('creating binary test file');
})
readableBuffer.pipe(testRaw);
