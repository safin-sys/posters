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

const Layer = ({ layer }) => {
    const { id, component } = layer;
    const [value, setValue] = useState(rgb2Hex(component.style.fill));

    const handleChange = (e) => {
        component.style.fill = e.target.value;
        setValue(e.target.value);
    };
    return (
        <div
            className="p-1 bg-slate-300 mb-1 flex justify-between hover:bg-slate-200"
            onMouseEnter={() => component.classList.add("svg_hover")}
            onMouseLeave={() => component.classList.remove("svg_hover")}
        >
            <h1>{id}</h1>
            <input value={value} onChange={handleChange} type="color" />
        </div>
    );
};
