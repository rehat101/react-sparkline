import { observable, action, asFlat } from 'mobx';
import 'isomorphic-fetch';

class SparkStore {
  @observable data = asFlat([]);
  @observable symbol = null;
  @observable size;

  @action setSize(size) {
    this.size = size;
  }

  @action setData(data) {
    this.data = data;
  }

  @action setSymbol(symbol) {
    this.symbol = symbol;
  }

  @action async loadData(name) {
    try {
      //get data
      let response = await fetch('/api/stock/' + name);
      let data = await response.json();
      let symbol = data.chart.result[0].meta.symbol;

      //cleanup
      data = data.chart.result[0].indicators.quote[0].close;
      data.forEach((value, index) => (
        data[index] = data[index] > 0 ? data[index] : data[index - 1])
      );

      //set data
      this.setSize(data.length);
      this.setData(data);
      this.setSymbol(symbol);
    }
    catch(err) { console.log(err); }
  }
}

export default new SparkStore();

