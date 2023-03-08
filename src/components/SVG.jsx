import templates from "@/utils/templates";

const SVG = ({ name, ...rest }) => {
    const Icon = templates[name];
    return <Icon {...rest} />;
};

export default SVG;
