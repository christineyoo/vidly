import _ from 'lodash';

//Pagination on the client side
export function paginate(items, pageNumber, pageSize) {
  //Calculates the starting index of the items on this page
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}

// _(items)       //Convert the items array to a lodash wrapper. That allows us to chain the lodash methods
// .slice(items, startIndex);  //Slice the items array starting from the startIndex
// .take()        //The input is the number of items we want to take from that array (pageSize = 4)
// .value()                    //Convert lodash object to a regular array
