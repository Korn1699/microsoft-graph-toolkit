/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */

import { html } from 'lit-element';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { withWebComponentsKnobs } from 'storybook-addon-web-components-knobs';
import { withSignIn } from '../../.storybook/addons/signInAddon/signInAddon';
import { withCodeEditor } from '../../.storybook/addons/codeEditorAddon/codeAddon';
import '../../dist/es6/components/mgt-people-picker/mgt-people-picker';

export default {
  title: 'Components | mgt-people-picker',
  component: 'mgt-people-picker',
  decorators: [withA11y, withSignIn, withCodeEditor],
  parameters: { options: { selectedPanel: 'storybookjs/knobs/panel' } }
};

export const peoplePicker = () => html`
  <mgt-people-picker></mgt-people-picker>
`;

export const groupId = () => html`
<mgt-people-picker group-id="02bd9fd6-8f93-4758-87c3-1fb73740a315"></mgt-people-picker>
`;

export const pickPeopleAndGroups = () => html`
<mgt-people-picker type="Any"></mgt-people-picker>
<!-- type can be "Any", "Person", "Group" -->
`;

export const pickGroups = () => html`
<mgt-people-picker type="Group"></mgt-people-picker>
<!-- type can be "Any", "Person", "Group" -->
`;

export const pickDistributionGroups = () => html`
<mgt-people-picker type="Group" group-type="Distribution"></mgt-people-picker>
<!-- group-type can be "Any", "Unified", "Security", "MailEnabledSecurity", "Distribution" -->
`;
