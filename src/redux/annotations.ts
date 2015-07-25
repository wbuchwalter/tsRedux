import 'reflect-metadata';

/**
 * -------------------
 * Decorator forwarding all actions where action.actionType match any of the decorator param 
 * to the decorated method.
 * If no actionType is passed, all actions will be accepted
 * */
export function handleAction(...actionTypes: string[]) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('handleAction', actionTypes, target, propertyKey);
    return descriptor;
  };
}
