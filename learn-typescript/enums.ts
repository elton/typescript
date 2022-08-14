enum LoadingState {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  FAILED = 'FAILED',
}

const isLoading = (state: LoadingState) => state === LoadingState.LOADING;

console.log(isLoading(LoadingState.LOADING)); // true

// Literal Types

function rollDice(dice: 1 | 2 | 3): number {
  let pip = 0;
  for (let i = 0; i < dice; i++) {
    pip += Math.floor(Math.random() * 6) + 1;
  }
  return pip;
}
console.log(rollDice(3)); // 1 ~ 3
