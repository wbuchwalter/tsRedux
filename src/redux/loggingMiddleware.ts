
export default function loggingMiddleware() {
  return (next) => (action) => {
    if(action.promise) {
      console.log(action.types);
    } else {
      console.log(action.type);
    }
    next(action);
  }
}