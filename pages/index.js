import { rgb2Hex } from "@/utils/rgb2Hex";
import { useEffect, useState } from "react";
import SVG from "@/components/SVG";

const Index = () => {
    const [layers, setLayers] = useState([]);
    useEffect(() => {
        const svg = document.querySelector("svg");
        const layers = svg.querySelectorAll("svg *");
        setLayers(layers);
    }, []);
    const layerList = [...layers]
        .filter((i) => i.getAttribute("id"))
        .map((i) => ({
            id: i.getAttribute("id").split("__")[1],
            component: i,
        }));
    return (
        <main className="flex">
            <section className="w-full h-screen bg-slate-200 p-4">
                <h1>Preview</h1>
                <SVG name="poster1" className="w-[500px]" />
            </section>
            <section className="w-[33%] h-screen bg-slate-400 p-4">
                <h1>Edit</h1>
                <div className="mt-4">
                    {layerList.map((layer, i) => (
                        <Layer key={i} layer={layer} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Index;

const Layer = ({ layer: { id, component } }) => {
    const [color, setColor] = useState(rgb2Hex(component.style.fill));
    const type = component.getAttribute("data-type");

    const handleChangeColor = (e) => {
        component.style.fill = e.target.value;
        setColor(e.target.value);
    };

    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        const objectUrl = URL.createObjectURL(file);
        const targetElement = document.createElement("img");
        targetElement.setAttribute("src", objectUrl);
        targetElement.setAttribute("alt", "image");
        document
            .getElementById("template_container")
            .appendChild(targetElement);
        dragElement(document.querySelector("img"));
    };

    function dragElement(elmnt) {
        console.log(elmnt);
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id + "header").onmousedown =
                dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = elmnt.offsetTop - pos2 + "px";
            elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    return (
        <div
            className="p-1 bg-slate-300 mb-1 flex justify-between hover:bg-slate-200"
            onMouseEnter={() => component.classList.add("svg_hover")}
            onMouseLeave={() => component.classList.remove("svg_hover")}
        >
            <h1>{id}</h1>
            {type === "color" && (
                <input
                    value={color}
                    onChange={handleChangeColor}
                    type="color"
                />
            )}
            {type === "image" && (
                <input onChange={handleChangeImage} type="file" />
            )}
            <button onClick={() => component.remove()}>Delete</button>
        </div>
    );
};
