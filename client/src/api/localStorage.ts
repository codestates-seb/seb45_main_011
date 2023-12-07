class LocalStorage {
  constructor() {}

  static setItem(key: string, value: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  static getItem(key: string) {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem(key) || '');
    }

    return null;
  }
}

export default LocalStorage;
