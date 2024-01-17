// @ts-check
import { isString } from '@/utils/is'

export class NavLink {
  /**
   * @param {Object} params
   * @param {string} params.label  Required
   * @param {string} params.href   Required
   * @param {string} [params.id]   Optional - will derive from `label` if omitted
   * @param {string} [params.aria] Optional - will use `label` if omitted
   */
  constructor ({ label, href, id, aria }) {
    if (!isString(label) || label.length < 1) throw new Error('Missing or invalid `label` param')
    if (!isString(href) || href.length < 1) throw new Error('Missing or invalid `href` param')

    this.label = label
    this.href = href
    this.aria = isString(aria) ? aria : label
    this.id = isString(id) ? id : this.#makeId(label)
  }

  /**
   * replace all non-word characters with _ underscore
   * @param {any} val
   * @returns {string}
  */
  #makeId (val) {
    return String(val).toUpperCase().replaceAll(/\W/g, '_')
  }
}

export const navLinks = [
  new NavLink({
    href: '/proposition-1',
    label: 'Proposition I'
  }),
  new NavLink({
    href: '/proposition-2',
    label: 'Proposition II'
  }),
  new NavLink({
    href: '/II.Hypotheses',
    label: 'Section 2 Hypotheses'
  }),
  new NavLink({
    href: '/about',
    label: 'About'
  })
]
