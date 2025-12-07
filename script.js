// Linked List Node Structure
class Node {
    constructor(name, qty, expiry) {
        this.name = name;
        this.qty = qty;
        this.expiry = expiry;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    add(name, qty, expiry) {
        let newNode = new Node(name, qty, expiry);

        if (!this.head) {
            this.head = newNode;
        } else {
            let temp = this.head;
            while (temp.next) temp = temp.next;
            temp.next = newNode;
        }
        display();
    }

    removeExpired() {
        let today = new Date().toISOString().split("T")[0];
        while (this.head && this.head.expiry < today)
            this.head = this.head.next;

        let temp = this.head;
        while (temp && temp.next) {
            if (temp.next.expiry < today)
                temp.next = temp.next.next;
            else
                temp = temp.next;
        }
        display();
    }
}

let list = new LinkedList();

function addMedicine() {
    let name = document.getElementById("name").value;
    let qty = document.getElementById("qty").value;
    let expiry = document.getElementById("expiry").value;

    if (name === "" || qty === "" || expiry === "") {
        alert("Please enter all details!");
        return;
    }

    list.add(name, qty, expiry);

    document.getElementById("name").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("expiry").value = "";
}

function deleteExpired() {
    list.removeExpired();
}

function display() {
    let ul = document.getElementById("medicineList");
    ul.innerHTML = "";

    let temp = list.head;
    let today = new Date().toISOString().split("T")[0];

    while (temp != null) {
        let li = document.createElement("li");
        li.innerHTML = `${temp.name} (Qty: ${temp.qty}) - Exp: ${temp.expiry}`;
        if (temp.expiry < today) li.classList.add("expired");
        ul.appendChild(li);
        temp = temp.next;
    }
}
