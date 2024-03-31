import styled from "@emotion/styled";

const DEFAULT_CONTAINER_WIDTH = "750px";

const ContainerElement = styled.div`
    max-width: var(--container-width, none);
    margin-left: auto;
    margin-right: auto;
`;

/**
 *
 * @param {Object}                    props            React component props. Additional props will be passed to the header wrapper.
 * @param {boolean|string}            props.contained  True to use the default container width, string to set a custom max-width.
 * @param {string|React.ReactElement} [props.as]       A component or HTML tag as which to render the container (e.g. `main`).
 * @param {React.ReactNode}           [props.children] Children to render in the container.
 * @return {React.ReactElement}
 * @class
 */
const Container = ({ contained = false, children, as = "main", ...props }) => {
    const style = {
        ...(props.style || {}),
    };

    if (typeof contained === "string") {
        style["--container-width"] = contained;
    } else if (contained) {
        style["--container-width"] = DEFAULT_CONTAINER_WIDTH;
    }

    return (
        <ContainerElement {...props} style={style} as={as}>
            {children}
        </ContainerElement>
    );
};

Container.DEFAULT_WIDTH = DEFAULT_CONTAINER_WIDTH;

export default Container;
