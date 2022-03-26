import ISupplier from "./Supplier";

export async function searchSuppliers() {
    let url = process.env.REACT_APP_API + 'suppliers'
    let response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })
    return await response.json();
}

export async function searchSupplierById(id: String) {
    let url = process.env.REACT_APP_API + 'suppliers/' + id
    let response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })
    return await response.json();
}

export async function removeSupplier(id: String) {
    let url = process.env.REACT_APP_API + 'suppliers/' + id
    await fetch(url, {
        "method": 'DELETE',
        "headers": {
            "Content-Type": 'application/json'
        }
    })
}

export async function saveSupplier(supplier:ISupplier) {
    let url = process.env.REACT_APP_API + 'suppliers'
    await fetch(url, {
        "method": 'POST',
        "body": JSON.stringify(supplier),
        "headers": {
            "Content-Type": 'application/json'
        }
    })
}