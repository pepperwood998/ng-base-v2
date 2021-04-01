class SimpleObject extends Object {
  [key: string]: any;
}

class BaseModel extends SimpleObject {
  constructor() {
    super();
  }

  fill(data: any): BaseModel {
    if (Array.isArray(data) || typeof data !== "object") {
      return this;
    }

    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (this.hasOwnProperty(key) && typeof value !== "function") {
        if (typeof value === "object") {
          const valueRef = this[key];
          if (valueRef instanceof BaseModel) {
            valueRef.fill(value);
          } else {
            this[key] = { ...value };
          }
        } else if (Array.isArray(value)) {
          this[key] = [...value];
        } else {
          this[key] = value;
        }
      }
    });
    return this;
  }
}

export { SimpleObject, BaseModel };
