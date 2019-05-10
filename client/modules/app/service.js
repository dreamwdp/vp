const privateFn = {
  getWhoteRoute(r) {
    const a = r.reduce((accumulator, currentValue, currentIndex, array) => {
      return accumulator + (currentValue.path || '');
    }, '');
    return a;
  }
};

const colorUrls = ['/', '//like', '//portfolio','//latest'];

const output = {
  compareRoutes(r1, r2){
    const r1str = privateFn.getWhoteRoute(r1);
    const r2str = privateFn.getWhoteRoute(r2);

    let same = null;
    if(colorUrls.indexOf(r1str) > -1 && colorUrls.indexOf(r2str) > -1){
      same = true;
    }else{
      same = r1str === r2str;
    }
    return same;
  },
  determineEffect(r1, r2){
    let result = null;
    if(r2.substring(1,6) === 'color' && (r1 === '/latest' || r1 === '/')){
      // share color page
      result = false;
    } else if (r1.substring(1,6) === 'color' && (r2 === '/latest' || r2 === '/')){
      // return from color page
      result = false;
    } else if (r2 === '/new') {
      result = false;
    } else{
      result = true;
    }
    return result;
  }
};

export default output;
