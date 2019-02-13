/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface GraphAgenda {
    'eventTemplateFunction': (event: any) => string;
  }
  interface GraphAgendaAttributes extends StencilHTMLAttributes {
    'eventTemplateFunction'?: (event: any) => string;
  }

  interface GraphLogin {
    'login': () => Promise<void>;
    'logout': () => Promise<void>;
  }
  interface GraphLoginAttributes extends StencilHTMLAttributes {}

  interface GraphTestAuth {}
  interface GraphTestAuthAttributes extends StencilHTMLAttributes {}

  interface GraphMsalProvider {
    'clientId': string;
    'loginType': string;
  }
  interface GraphMsalProviderAttributes extends StencilHTMLAttributes {
    'clientId'?: string;
    'loginType'?: string;
  }

  interface GraphWamProvider {
    'clientId': string;
  }
  interface GraphWamProviderAttributes extends StencilHTMLAttributes {
    'clientId'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'GraphAgenda': Components.GraphAgenda;
    'GraphLogin': Components.GraphLogin;
    'GraphTestAuth': Components.GraphTestAuth;
    'GraphMsalProvider': Components.GraphMsalProvider;
    'GraphWamProvider': Components.GraphWamProvider;
  }

  interface StencilIntrinsicElements {
    'graph-agenda': Components.GraphAgendaAttributes;
    'graph-login': Components.GraphLoginAttributes;
    'graph-test-auth': Components.GraphTestAuthAttributes;
    'graph-msal-provider': Components.GraphMsalProviderAttributes;
    'graph-wam-provider': Components.GraphWamProviderAttributes;
  }


  interface HTMLGraphAgendaElement extends Components.GraphAgenda, HTMLStencilElement {}
  var HTMLGraphAgendaElement: {
    prototype: HTMLGraphAgendaElement;
    new (): HTMLGraphAgendaElement;
  };

  interface HTMLGraphLoginElement extends Components.GraphLogin, HTMLStencilElement {}
  var HTMLGraphLoginElement: {
    prototype: HTMLGraphLoginElement;
    new (): HTMLGraphLoginElement;
  };

  interface HTMLGraphTestAuthElement extends Components.GraphTestAuth, HTMLStencilElement {}
  var HTMLGraphTestAuthElement: {
    prototype: HTMLGraphTestAuthElement;
    new (): HTMLGraphTestAuthElement;
  };

  interface HTMLGraphMsalProviderElement extends Components.GraphMsalProvider, HTMLStencilElement {}
  var HTMLGraphMsalProviderElement: {
    prototype: HTMLGraphMsalProviderElement;
    new (): HTMLGraphMsalProviderElement;
  };

  interface HTMLGraphWamProviderElement extends Components.GraphWamProvider, HTMLStencilElement {}
  var HTMLGraphWamProviderElement: {
    prototype: HTMLGraphWamProviderElement;
    new (): HTMLGraphWamProviderElement;
  };

  interface HTMLElementTagNameMap {
    'graph-agenda': HTMLGraphAgendaElement
    'graph-login': HTMLGraphLoginElement
    'graph-test-auth': HTMLGraphTestAuthElement
    'graph-msal-provider': HTMLGraphMsalProviderElement
    'graph-wam-provider': HTMLGraphWamProviderElement
  }

  interface ElementTagNameMap {
    'graph-agenda': HTMLGraphAgendaElement;
    'graph-login': HTMLGraphLoginElement;
    'graph-test-auth': HTMLGraphTestAuthElement;
    'graph-msal-provider': HTMLGraphMsalProviderElement;
    'graph-wam-provider': HTMLGraphWamProviderElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
