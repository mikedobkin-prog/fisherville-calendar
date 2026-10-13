import {cpSync,rmSync} from 'node:fs';
rmSync(new URL('../production',import.meta.url),{recursive:true,force:true});
cpSync(new URL('../source',import.meta.url),new URL('../production',import.meta.url),{recursive:true});
console.log('Production built.');
