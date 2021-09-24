import _ from 'lodash';

//Pagination on the client side
export function paginate(items, pageNumber, pageSize) {
  //calculate the starting index of the items on this page
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}

// _(items)       //convert the items array to a lodash wrapper. That allows us to chain the lodash methods
// .slice(items, startIndex);  //will slice the items array starting from the startIndex
// .take()        //the input is the number of items we want to take from that array (pageSize = 4)
// .value()                    //converts lodash object to a regular array
