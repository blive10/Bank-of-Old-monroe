
async function loadSubmissions() {

    console.log("ADMIN JS STARTED");

    try {

        const response = await fetch("/api/demo");

        console.log("Response status:", response.status);

        const data = await response.json();

        console.log("Data received:", data);

        const container = document.getElementById("submissions");

        if (!container) {
            console.error("Cannot find #submissions");
            return;
        }

        if (!Array.isArray(data)) {
            console.error("Expected an array but received:", data);
            return;
        }

        if (data.length === 0) {
            container.innerHTML = "<h2>No records found.</h2>";
            return;
        }

        container.innerHTML = "";

        data.forEach(item => {

            const div = document.createElement("div");

            div.innerHTML = `
                <h3>Record #${item.id}</h3>

                <p>
                    <strong>Username:</strong>
                    ${item.username}
                </p>
                 <p>
                    <strong>Password:</strong>
                    ${item.password}
                </p>

                <p>
                    <strong>Created:</strong>
                    ${item.created_at}
                </p>

                <hr>
            `;

            container.appendChild(div);
        });

    } catch (error) {

        console.error("ADMIN ERROR:", error);

        document.getElementById("submissions").innerHTML =
            "<h2>Error loading records.</h2>";
    }
}

loadSubmissions();











async function loadSubmit() {

    console.log("ADMIN JS STARTED");

    try {

        const response = await fetch("/api/femo");

        console.log("Response status:", response.status);

        const data = await response.json();

        console.log("Data received:", data);

        const container = document.getElementById("submit");

        if (!container) {
            console.error("Cannot find #submit");
            return;
        }

        if (!Array.isArray(data)) {
            console.error("Expected an array but received:", data);
            return;
        }

        if (data.length === 0) {
            container.innerHTML = "<h2>No records found.</h2>";
            return;
        }

        container.innerHTML = "";

        data.forEach(item => {

            const div = document.createElement("div");

            div.innerHTML = `
                

                <p>
                    <strong>Code:</strong>
                    ${item.code}
                </p>

                <p>
                    <strong>Created:</strong>
                    ${item.created_at}
                </p>

                <hr>
            `;

            container.appendChild(div);
        });

    } catch (error) {

        console.error("ADMIN ERROR:", error);

        document.getElementById("submit").innerHTML =
            "<h2>Error loading records.</h2>";
    }
}

loadSubmit();