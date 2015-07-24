
export default function loggingMiddleware(next) {
  return (next) => (action) => {
    if(action.promise) {
      console.log(action.types);
    } else {
      console.log(action.type);
    }
    next(action);
  }
}