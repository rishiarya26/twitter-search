
export const localStorage = {
    set(key, val) {
      if (!key || !val) return false;
      const value = typeof window !== "undefined" ? window?.localStorage?.setItem(key, JSON.stringify(val)) : null;
      return value
    },
    remove(key = '') {
      const value = typeof window !== "undefined" ? window?.localStorage?.removeItem(key) : null;
      return value;
    },
    get(key) {
      if (!key) return false;
      let data = typeof window !== "undefined" && window?.localStorage?.getItem(key);
      if (!data) {
        return null;
      }
      try {
        data = JSON.parse(data);
      } catch (e) {
        data = null;
      }
      return data;
    }
  };