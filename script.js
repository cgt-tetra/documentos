document.getElementById("convertBtn").addEventListener("click", () => {
    const file = document.getElementById("imageInput").files[0];
    if (!file) return alert("Sube una imagen primero");

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Reducimos tamaño para que el HTML no sea gigante
        const width = 50;
        const ratio = img.height / img.width;
        const height = Math.round(width * ratio);

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        let html = "<div style='display:grid;grid-template-columns:repeat(" + width + ", 10px);'>";

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const pixel = ctx.getImageData(x, y, 1, 1).data;
                const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
                html += `<div style="width:10px;height:10px;background:${color};"></div>`;
            }
        }

        html += "</div>";

        document.getElementById("output").innerHTML = html;
        document.getElementById("htmlCode").value = html;
    };
});
