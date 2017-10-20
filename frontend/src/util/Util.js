export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i].id === obj.id) {
            return true;
        }
    }
    return false;
}

//https://stackoverflow.com/questions/40927938/extract-time-from-timestamp-in-js
export function getTimeFromDate(timestamp) {
  var date = new Date(timestamp * 1000);
  date.setFullYear(2017)

  return date.toLocaleString();
}

export function sortObjectArrayByKey(objs, key) {
  return objs.sort(function(a, b) {
    return a[key] < b[key]
  })
}