// async function sleep(ms) {
//    return new Promise(r => setTimeout(() => r(13), ms)); 
//   }

async function main() {
  console.log(1);
  await 0;
  console.log(2);
}

main();

// setTimeout(main, 100);
// setTimeout(main, 200);
// setTimeout(main, 300);
