import templates from "@/utils/templates";
import { useRef } from "react";
import { useScreenshot } from "use-react-screenshot";

const SVG = ({ name, ...rest }) => {
    const Template = templates[name];

    const ref = useRef(null);
    const [image, takeScreenshot] = useScreenshot();
    const handleCapture = () => takeScreenshot(ref.current);
    return (
        <>
            <div
                ref={ref}
                id="template_container"
                className="relative overflow-hidden w-[500px] h-[710px]"
            >
                <Template {...rest} />
            </div>
            <button onClick={handleCapture}>capture</button>
            <img src={image} alt="ad" className="mt-[100vh]" />
        </>
    );
};

export default SVG;
