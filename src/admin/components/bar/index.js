import styled from "@emotion/styled";

import {
    // eslint-disable-next-line @wordpress/no-unsafe-wp-apis
    __experimentalHStack as HStack,
    // eslint-disable-next-line @wordpress/no-unsafe-wp-apis
    __experimentalSpacer as Spacer,
} from "@wordpress/components";

const Row = styled(HStack)`
    padding: 5px 20px;
    width: auto;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
    min-height: 72px;
    box-sizing: inherit;
    margin-top: ${({ hasTopMargin }) => (hasTopMargin ? "8px" : "0")};
    margin-bottom: ${({ hasBottomMargin }) => (hasBottomMargin ? "8px" : "0")};
`;

/**
 * A full width bar with three columns.
 * For example usage see PageHeader.
 *
 * @param {Object}          props                   React component props. Additional props will be passed to the wrapper.
 * @param {React.ReactNode} [props.start]           Elements to render at the start/left of the bar.
 * @param {React.ReactNode} [props.center]          Elements to render in the center of the bar.
 * @param {React.ReactNode} [props.end]             Elements to render at the end/right of the bar.
 * @param {boolean}         [props.hasTopMargin]    Whether to add a top margin to the header.
 * @param {boolean}         [props.hasBottomMargin] Whether to add a bottom margin to the header.
 * @return {React.ReactElement}
 * @class
 */
const Bar = ({ start, center, end, ...props }) => {
    return (
        <Row alignment={"center"} justify={"space-between"} expanded {...props}>
            <HStack alignment={"center"} spacing={1} justify={"flex-start"}>
                {start}
            </HStack>
            {center ? (
                <HStack alignment={"center"}>{center}</HStack>
            ) : (
                <Spacer />
            )}
            <HStack alignment={"center"} spacing={2} justify={"flex-end"}>
                {end}
            </HStack>
        </Row>
    );
};

export default Bar;
