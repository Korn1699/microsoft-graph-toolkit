/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */

import { customElement, html, property, TemplateResult } from 'lit-element';
import { MgtTemplatedComponent } from '../../../../../components/templatedComponent';
import { Providers } from '../../../../../Providers';
import { ProviderState } from '../../../../../providers/IProvider';
import { BetaGraph } from '../../../../BetaGraph';
import { getProfile, IPersonAnniversary, IPersonInterest, IProfile } from './graph.profile';
import { styles } from './mgt-person-card-beta-profile-css';

/**
 * foo
 *
 * @export
 * @class MgtPersonCardBetaProfile
 * @extends {MgtTemplatedComponent}
 */
@customElement('mgt-person-card-beta-profile')
export class MgtPersonCardBetaProfile extends MgtTemplatedComponent {
  /**
   * Array of styles to apply to the element. The styles should be defined
   * using the `css` tag function.
   */
  static get styles() {
    return styles;
  }

  /**
   * user-id property allows developer to use id value for component
   * @type {string}
   */
  @property({
    attribute: 'user-id'
  })
  public userId: string;

  private profile: IProfile;
  private personalInterests: IPersonInterest[];
  private professionalInterests: IPersonInterest[];
  private birthdayAnniversary: IPersonAnniversary;

  /**
   * Invoked on each update to perform rendering tasks. This method must return
   * a lit-html TemplateResult. Setting properties inside this method will *not*
   * trigger the element to update.
   */
  protected render() {
    const template = html`
      <div class="title">About</div>
      ${this.renderLanguages()} ${this.renderSkills()} ${this.renderWorkExperience()} ${this.renderEducation()}
      ${this.renderProfessionalInterests()} ${this.renderPersonalInterests()} ${this.renderBirthday()}
    `;

    setTimeout(() => {
      const sections = this.shadowRoot.querySelectorAll('section');
      sections.forEach(section => {
        this.handleTokenOverflow(section);
        this.drawSectionTimeline(section);
      });
    }, 0);

    return template;
  }

  /**
   * foo
   *
   * @protected
   * @returns
   * @memberof MgtPersonCardBetaProfile
   */
  protected renderLanguages(): TemplateResult {
    let contentTemplate: TemplateResult;

    if (this.profile && this.profile.languages) {
      const languageItems: TemplateResult[] = [];

      for (const language of this.profile.languages) {
        let proficiency = null;
        if (language.proficiency && language.proficiency.length) {
          proficiency = html`
            <span class="language__proficiency">
              &nbsp;(${language.proficiency})
            </span>
          `;
        }

        languageItems.push(html`
          <div class="token-list__item language">
            <span class="language__title">${language.displayName}</span>
            ${proficiency}
          </div>
        `);
      }

      contentTemplate = html`
        <div class="token-list">
          ${languageItems}
        </div>
      `;
    } else {
      contentTemplate = html`
        <div>None</div>
      `;
    }

    const languagesTemplate = html`
      <section>
        <div class="section__title">Languages</div>
        <div class="section__content">
          ${contentTemplate}
        </div>
      </section>
    `;

    return languagesTemplate;
  }

  /**
   * foo
   *
   * @protected
   * @returns {TemplateResult}
   * @memberof MgtPersonCardBetaProfile
   */
  protected renderSkills(): TemplateResult {
    let contentTemplate: TemplateResult;

    if (this.profile && this.profile.skills) {
      const skillItems: TemplateResult[] = [];
      for (const skill of this.profile.skills) {
        skillItems.push(html`
          <div class="token-list__item skill">
            ${skill.displayName}
          </div>
        `);
      }

      contentTemplate = html`
        <div class="token-list">
          ${skillItems}
        </div>
      `;
    } else {
      contentTemplate = html`
        <div>None</div>
      `;
    }

    return html`
      <section>
        <div class="section__title">Skills</div>
        <div class="section__content">
          ${contentTemplate}
        </div>
      </section>
    `;
  }

  /**
   * foo
   *
   * @protected
   * @returns {TemplateResult}
   * @memberof MgtPersonCardBetaProfile
   */
  protected renderWorkExperience(): TemplateResult {
    let contentTemplate: TemplateResult;

    if (this.profile && this.profile.positions) {
      const positionItems: TemplateResult[] = [];
      for (const position of this.profile.positions) {
        positionItems.push(html`
          <div class="data-list__item work-position">
            <div class="data-list__item__title">${position.detail.jobTitle}</div>
            <div class="data-list__item__content flex-rows">
              <div>
                <div class="work-position__company">${position.detail.company.displayName}</div>
                <div class="work-position__location">
                  ${position.detail.company.address.city}, ${position.detail.company.address.state}
                </div>
              </div>
              <div class="date-range">
                <div class="work-position__date-range">${this.getDisplayDateRange(position.detail)}</div>
                <div class="date-range__circle"></div>
              </div>
            </div>
          </div>
        `);
      }

      contentTemplate = html`
        <div class="data-list" data-if="positions && positions.length">
          ${positionItems}
        </div>
      `;
    } else {
      contentTemplate = html`
        <div>None</div>
      `;
    }

    return html`
      <section>
        <div class="section__title">Work Experience</div>
        <div class="section__content">
          ${contentTemplate}
        </div>
      </section>
    `;
  }

  /**
   * foo
   *
   * @protected
   * @returns {TemplateResult}
   * @memberof MgtPersonCardBetaProfile
   */
  protected renderEducation(): TemplateResult {
    let contentTemplate: TemplateResult;

    if (this.profile && this.profile.positions) {
      const positionItems: TemplateResult[] = [];
      for (const educationalActivity of this.profile.educationalActivities) {
        positionItems.push(html`
          <div class="data-list__item educational-activity">
            <div class="data-list__item__title">${educationalActivity.institution.displayName}</div>
            <div class="data-list__item__content flex-rows">
              <div>
                <div class="educational-activity__degree">${educationalActivity.program.displayName}</div>
              </div>
              <div class="date-range">
                <div class="educational-activity__date-range">
                  ${this.getDisplayDateRange(educationalActivity)}
                </div>
                <div class="date-range__circle"></div>
              </div>
            </div>
          </div>
        `);
      }

      contentTemplate = html`
        <div class="data-list">
          ${positionItems}
        </div>
      `;
    } else {
      contentTemplate = html`
        <div>None</div>
      `;
    }

    return html`
      <section>
        <div class="section__title">Education</div>
        <div class="section__content">
          ${contentTemplate}
        </div>
      </section>
    `;
  }

  /**
   * foo
   *
   * @protected
   * @returns {TemplateResult}
   * @memberof MgtPersonCardBetaProfile
   */
  protected renderProfessionalInterests(): TemplateResult {
    let contentTemplate: TemplateResult;

    if (this.professionalInterests && this.professionalInterests.length) {
      const interestItems: TemplateResult[] = [];
      for (const interest of this.professionalInterests) {
        interestItems.push(html`
          <div class="token-list__item interest interest--professional">
            ${interest.displayName}
          </div>
        `);
      }

      contentTemplate = html`
        <div class="token-list">
          ${interestItems}
        </div>
      `;
    } else {
      contentTemplate = html`
        <div>None</div>
      `;
    }

    return html`
      <section>
        <div class="section__title">Professional Interests</div>
        <div class="section__content">
          ${contentTemplate}
        </div>
      </section>
    `;
  }

  /**
   * foo
   *
   * @protected
   * @returns {TemplateResult}
   * @memberof MgtPersonCardBetaProfile
   */
  protected renderPersonalInterests(): TemplateResult {
    let contentTemplate: TemplateResult;

    if (this.personalInterests && this.personalInterests.length) {
      const interestItems: TemplateResult[] = [];
      for (const interest of this.personalInterests) {
        interestItems.push(html`
          <div class="token-list__item interest interest--personal">
            ${interest.displayName}
          </div>
        `);
      }

      contentTemplate = html`
        <div class="token-list">
          ${interestItems}
        </div>
      `;
    } else {
      contentTemplate = html`
        <div>None</div>
      `;
    }

    return html`
      <section>
        <div class="section__title">Personal Interests</div>
        <div class="section__content">
          ${contentTemplate}
        </div>
      </section>
    `;
  }

  /**
   * foo
   *
   * @protected
   * @returns {TemplateResult}
   * @memberof MgtPersonCardBetaProfile
   */
  protected renderBirthday(): TemplateResult {
    let contentTemplate: TemplateResult;

    if (this.birthdayAnniversary) {
      contentTemplate = html`
        <div class="birthday">
          <div class="birthday__icon">
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                opacity="0.5"
                d="M5.125 10.0625C5.125 10.2448 5.15918 10.4157 5.22754 10.5752C5.2959 10.7347 5.38932 10.8737 5.50781 10.9922C5.6263 11.1107 5.7653 11.2041 5.9248 11.2725C6.08431 11.3408 6.25521 11.375 6.4375 11.375H9.0625C9.35872 11.375 9.63672 11.4297 9.89648 11.5391C10.1608 11.6484 10.3978 11.8079 10.6074 12.0176C10.8171 12.2272 10.9766 12.4642 11.0859 12.7285C11.1953 12.9883 11.25 13.2663 11.25 13.5625C11.25 13.681 11.2067 13.7835 11.1201 13.8701C11.0335 13.9567 10.931 14 10.8125 14C10.694 14 10.5915 13.9567 10.5049 13.8701C10.4183 13.7835 10.375 13.681 10.375 13.5625C10.375 13.3802 10.3408 13.2093 10.2725 13.0498C10.2041 12.8903 10.1107 12.7513 9.99219 12.6328C9.8737 12.5143 9.7347 12.4209 9.5752 12.3525C9.41569 12.2842 9.24479 12.25 9.0625 12.25H6.4375C6.14128 12.25 5.861 12.1953 5.59668 12.0859C5.33691 11.9766 5.10221 11.8171 4.89258 11.6074C4.68294 11.3978 4.52344 11.1631 4.41406 10.9033C4.30469 10.639 4.25 10.3587 4.25 10.0625V9.46777C3.7168 9.21712 3.23372 8.89811 2.80078 8.51074C2.36784 8.12337 1.9987 7.69043 1.69336 7.21191C1.39258 6.72884 1.16016 6.21159 0.996094 5.66016C0.832031 5.10417 0.75 4.52995 0.75 3.9375C0.75 3.39518 0.852539 2.88477 1.05762 2.40625C1.26725 1.92773 1.5498 1.51074 1.90527 1.15527C2.26074 0.799805 2.67773 0.519531 3.15625 0.314453C3.63477 0.104818 4.14518 0 4.6875 0C5.22982 0 5.74023 0.104818 6.21875 0.314453C6.69727 0.519531 7.11426 0.799805 7.46973 1.15527C7.8252 1.51074 8.10547 1.92773 8.31055 2.40625C8.52018 2.88477 8.625 3.39518 8.625 3.9375C8.625 4.52995 8.54297 5.10417 8.37891 5.66016C8.21484 6.21615 7.98014 6.7334 7.6748 7.21191C7.37402 7.69043 7.00716 8.12337 6.57422 8.51074C6.14583 8.89811 5.66276 9.21712 5.125 9.46777V10.0625ZM1.625 3.9375C1.625 4.45247 1.69564 4.9515 1.83691 5.43457C1.98275 5.91309 2.18783 6.3597 2.45215 6.77441C2.72103 7.18913 3.04232 7.56283 3.41602 7.89551C3.79427 8.22363 4.2181 8.49479 4.6875 8.70898C5.1569 8.49479 5.57845 8.22363 5.95215 7.89551C6.3304 7.56283 6.65169 7.18913 6.91602 6.77441C7.1849 6.3597 7.38997 5.91309 7.53125 5.43457C7.67708 4.9515 7.75 4.45247 7.75 3.9375C7.75 3.51367 7.66797 3.11719 7.50391 2.74805C7.3444 2.37435 7.12565 2.05078 6.84766 1.77734C6.57422 1.49935 6.25065 1.2806 5.87695 1.12109C5.50781 0.957031 5.11133 0.875 4.6875 0.875C4.26367 0.875 3.86491 0.957031 3.49121 1.12109C3.12207 1.2806 2.7985 1.49935 2.52051 1.77734C2.24707 2.05078 2.02832 2.37435 1.86426 2.74805C1.70475 3.11719 1.625 3.51367 1.625 3.9375ZM6.4375 4.375C6.31901 4.375 6.21647 4.33171 6.12988 4.24512C6.04329 4.15853 6 4.05599 6 3.9375C6 3.75521 5.96582 3.58431 5.89746 3.4248C5.8291 3.2653 5.73568 3.1263 5.61719 3.00781C5.4987 2.88932 5.3597 2.7959 5.2002 2.72754C5.04069 2.65918 4.86979 2.625 4.6875 2.625C4.56901 2.625 4.46647 2.58171 4.37988 2.49512C4.29329 2.40853 4.25 2.30599 4.25 2.1875C4.25 2.06901 4.29329 1.96647 4.37988 1.87988C4.46647 1.79329 4.56901 1.75 4.6875 1.75C4.98828 1.75 5.27083 1.80697 5.53516 1.9209C5.80404 2.03483 6.03646 2.19206 6.23242 2.39258C6.43294 2.58854 6.59017 2.82096 6.7041 3.08984C6.81803 3.35417 6.875 3.63672 6.875 3.9375C6.875 4.05599 6.83171 4.15853 6.74512 4.24512C6.65853 4.33171 6.55599 4.375 6.4375 4.375Z"
                fill="black"
              />
            </svg>
          </div>
          <div class="birthday__date">
            ${this.getDisplayDate(this.birthdayAnniversary.date)}
          </div>
        </div>
      `;
    } else {
      contentTemplate = html`
        <div>Unknown</div>
      `;
    }

    return html`
      <section>
        <div class="section__title">Birthday</div>
        <div class="section__content">
          ${contentTemplate}
        </div>
      </section>
    `;
  }

  /**
   * load state into the component
   *
   * @protected
   * @returns
   * @memberof MgtPersonCard
   */
  protected async loadState() {
    const provider = Providers.globalProvider;

    // check if user is signed in
    if (!provider || provider.state !== ProviderState.SignedIn) {
      return;
    }

    if (!this.userId) {
      return;
    }

    const graph = provider.graph.forComponent(this);
    const betaGraph = BetaGraph.fromGraph(graph);

    const userId = this.userId;
    const profile = await getProfile(betaGraph, userId);

    this.injectDummyData(profile);

    this.profile = profile;
    this.birthdayAnniversary = profile.anniversaries.find(this.isBirthdayAnniversary);
    this.personalInterests = profile.interests.filter(this.isPersonalInterest);
    this.professionalInterests = profile.interests.filter(this.isProfessionalInterest);
  }

  private isPersonalInterest(interest) {
    return interest.categories && interest.categories.includes('personal');
  }

  private isProfessionalInterest(interest) {
    return interest.categories && interest.categories.includes('professional');
  }

  private isBirthdayAnniversary(anniversary) {
    return anniversary.type === 'birthday';
  }

  private getDisplayDate(date) {
    return date.toLocaleString('default', {
      day: 'numeric',
      month: 'long'
    });
  }

  // tslint:disable-next-line: completed-docs
  private getDisplayDateRange(event): string {
    const start = new Date(event.startMonthYear).getFullYear();
    if (start === 0) {
      return null;
    }

    const end = event.endMonthYear ? new Date(event.endMonthYear).getFullYear() : 'Current';
    return `${start} — ${end}`;
  }

  private handleTokenOverflow(section) {
    const tokenLists = section.querySelectorAll('.token-list');
    if (!tokenLists || !tokenLists.length) {
      return;
    }

    for (const tokenList of tokenLists) {
      const items = tokenList.querySelectorAll('.token-list__item');
      if (!items || !items.length) {
        continue;
      }

      let itemRect = items[0].getBoundingClientRect();
      const tokenListRect = tokenList.getBoundingClientRect();
      const maxtop = itemRect.height * 2 + tokenListRect.top;
      let overflowItems = null;
      for (let i = 0; i < items.length; i++) {
        itemRect = items[i].getBoundingClientRect();
        if (itemRect.top > maxtop) {
          overflowItems = Array.from(items).slice(i, items.length);
          break;
        }
      }

      if (overflowItems) {
        overflowItems.forEach(i => i.remove());

        const overflowToken = document.createElement('div');
        overflowToken.classList.add('token-list__item');
        overflowToken.innerText = `+ ${overflowItems.length} more`;
        tokenList.appendChild(overflowToken);
      }
    }
  }

  private drawSectionTimeline(section) {
    const circles = section.querySelectorAll('.date-range .date-range__circle');
    if (!circles || circles.length <= 1) {
      return;
    }

    for (let i = 0; i < circles.length - 1; i++) {
      const currentCircle = circles[i];
      const nextCircle = circles[i + 1];

      const line = document.createElement('div');
      line.classList.add('date-range__line');
      section.appendChild(line);

      const lineRect = line.getBoundingClientRect();
      const lineParentRect = line.offsetParent.getBoundingClientRect();
      const topCircleRect = currentCircle.getBoundingClientRect();
      const lastCircleRect = nextCircle.getBoundingClientRect();
      const top = topCircleRect.bottom - lineParentRect.top;
      const height = lastCircleRect.top - lineParentRect.top - top;
      const left = topCircleRect.left - lineParentRect.left + (topCircleRect.width / 2 - lineRect.width / 2);

      line.style.top = `${top}px`;
      line.style.height = `${height}px`;
      line.style.left = `${left}px`;
    }
  }

  // tslint:disable
  private injectDummyData(profile) {
    profile.languages.push({ displayName: 'English', proficiency: 'Native' });
    profile.languages.push({ displayName: 'Macedonian', proficiency: 'Native' });
    profile.languages.push({ displayName: 'Czech' });
    profile.skills.push({ displayName: 'Program Management' });
    profile.skills.push({ displayName: 'Microsoft Word 1983' });
    profile.skills.push({ displayName: 'REST API Design' });
    profile.skills.push({ displayName: 'Microsoft Graph Toolkit' });
    profile.skills.push({ displayName: 'Software Design' });
    profile.skills.push({ displayName: 'UX Prototyping' });
    profile.positions.push({
      detail: {
        startMonthYear: new Date(2016, 1),
        jobTitle: 'PM Architect',
        company: {
          displayName: 'Microsoft Corporation',
          address: {
            city: 'Seattle',
            state: 'WA'
          }
        }
      }
    });
    profile.positions.push({
      detail: {
        startMonthYear: new Date(2013, 1),
        endMonthYear: new Date(2014, 1),
        jobTitle: 'PM Architect',
        company: {
          displayName: 'Microsoft Corporation',
          address: {
            city: 'Seattle',
            state: 'WA'
          }
        }
      }
    });
    profile.positions.push({
      detail: {
        startMonthYear: new Date(2010, 1),
        endMonthYear: new Date(2012, 1),
        jobTitle: 'UX Designer',
        company: {
          displayName: 'Apple',
          address: {
            city: 'Seattle',
            state: 'WA'
          }
        }
      }
    });
    profile.positions.push({
      detail: {
        startMonthYear: new Date(2009, 1),
        endMonthYear: new Date(2012, 1),
        jobTitle: 'UX Designer',
        company: {
          displayName: 'IBM',
          address: {
            city: 'Seattle',
            state: 'WA'
          }
        }
      }
    });
    profile.educationalActivities.push({
      startMonthYear: new Date(2016, 1),
      institution: {
        displayName: 'University of Phoenix'
      },
      program: {
        displayName: "Bachelor's Degree"
      }
    });
    profile.educationalActivities.push({
      startMonthYear: new Date(2013, 1),
      endMonthYear: new Date(2014, 1),
      institution: {
        displayName: 'Harvard Business School'
      },
      program: {
        displayName: "Bachelor's Degree"
      }
    });
    profile.educationalActivities.push({
      startMonthYear: new Date(2013, 1),
      endMonthYear: new Date(2014, 1),
      institution: {
        displayName: 'Harvard Business School'
      },
      program: {
        displayName: "Bachelor's Degree"
      }
    });
    profile.educationalActivities.push({
      startMonthYear: new Date(2013, 1),
      endMonthYear: new Date(2014, 1),
      institution: {
        displayName: 'Harvard Business School'
      },
      program: {
        displayName: "Bachelor's Degree"
      }
    });
    profile.interests.push({ categories: ['professional'], displayName: 'Machine Learning' });
    profile.interests.push({ categories: ['professional'], displayName: 'REST' });
    profile.interests.push({ categories: ['professional'], displayName: 'UX Design' });
    profile.interests.push({ categories: ['professional'], displayName: 'API Design' });
    profile.interests.push({ categories: ['professional'], displayName: 'AI Ethics' });
    profile.interests.push({ categories: ['personal'], displayName: 'Seattle Sounders' });
    profile.interests.push({ categories: ['personal'], displayName: 'Skiing' });
    profile.interests.push({ categories: ['personal'], displayName: 'Chelsea FC' });
    profile.interests.push({ categories: ['personal'], displayName: 'Swimming' });
    profile.interests.push({ categories: ['personal'], displayName: 'Hiking' });
    profile.interests.push({ categories: ['personal'], displayName: 'Sound Design' });
    profile.anniversaries.push({ date: new Date(1989, 9, 17), type: 'birthday' });
  }
  // tslint:enable
}