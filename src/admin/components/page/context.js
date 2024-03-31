import { createContext, useContext } from "@wordpress/element";

/**
 * A context for admin pages. Provides the name of the current page.
 * @type {React.Context<{name: string}>}
 */
const PageContext = createContext({ name: "" });

/**
 * Use the current admin page context. Provides the name of the current page.
 * @return {{name: string}} The name (= slug) of the current page.
 */
const usePageContext = () => {
    return useContext(PageContext);
};

export { PageContext, usePageContext };
