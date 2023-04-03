export class NewSet {
    items: any;
    constructor() {
        this.items = {};
    }

    has(element: any) {
        // return element in items; -- Primera forma de implementación
        return Object.prototype.hasOwnProperty.call(this.items, element);
    }

    add(element: any) {
        if(!this.has(element)) {
            this.items[element] = element;
            return true;
        }
        return false;
    }

    delete(element: PropertyKey) {
        if(this.has(element)) {
            delete this.items[element];
            return true;
        }
        return false;
    }

    clear() {
        this.items = {};
    }

    size() {
        return Object.keys(this.items).length;
    }

    sizeLegacy() {
        let count = 0;
        for(const key in this.items) {
            if(this.items.has(key)) {
                count++;
            }
        }
        return count;
    }

    values() {
        return Object.values(this.items);
    }

    valuesLegacy() {
        const values = [];
        for(const key in this.items) {
            if(this.items.has(key)) {
                values.push(key);
            }
        }
        return values;
    }

    union(set: NewSet) {
        const unionSet = new NewSet();
        this.values().forEach(value => unionSet.add(value));
        set.values().forEach(value => unionSet.add(value));
        return unionSet;
    }

    /* intersection(set) { -- First method but it needs to iterate for all the elements in (this) so it is not efficient
        const intersectionSet = new Set();
        const values = this.values();
        for(let i = 0; i < values.length; i++) {
            if(set.has(values[i])) {
                intersectionSet.add(values[i]);
            }
        }
        return intersectionSet;
    } */

    intersection(set: NewSet) {
        const intersectionSet = new Set();
        const values = this.values();
        const otherValues = set.values();
        let biggerSet = values;
        let smallerSet = otherValues;
        if(biggerSet.length - smallerSet.length > 0) {
            biggerSet = otherValues;
            smallerSet = values;
        }
        smallerSet.forEach(value => {
            if(biggerSet.includes(value)) {
                intersectionSet.add(value);
            }
        });
        return intersectionSet;
    }

    difference(set: NewSet) {
        const differenceSet = new Set();
        this.values().forEach(value => {
            if(!set.has(value)) {
                differenceSet.add(value);
            }
        });
        return differenceSet;
    }

    isSubsetOf(set: NewSet) {
        if (this.size() > set.size()) {
            return false;
        }
        let isSubset = true;
        this.values().every(value => {
            if (!set.has(value)) {
                isSubset = false;
                return false;
            }
            return true;
        });
        return isSubset;
    }
}