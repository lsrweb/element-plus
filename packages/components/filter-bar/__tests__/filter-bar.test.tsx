import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import FilterBar from '../src/filter-bar.vue'
import FilterBarItem from '../src/filter-bar-item.vue'

describe('FilterBar', () => {
  test('renders fields and forwards layout variables', () => {
    const wrapper = mount(FilterBar, {
      props: {
        labelWidth: 96,
        itemWidth: 320,
        gap: 12,
      },
      slots: {
        default: '<div class="field">field</div>',
      },
    })

    expect(wrapper.classes()).toContain('elp-filter-bar')
    expect(wrapper.find('.field').exists()).toBe(true)
    expect(wrapper.attributes('style')).toContain(
      '--elp-filter-bar-label-width: 96px'
    )
    expect(wrapper.attributes('style')).toContain(
      '--elp-filter-bar-item-width: 320px'
    )
    expect(wrapper.attributes('style')).toContain('--elp-filter-bar-gap: 12px')
  })

  test('keeps nested controls in the current namespace', () => {
    const wrapper = mount(FilterBar, {
      slots: {
        default: () => <FilterBarItem label="Status">content</FilterBarItem>,
      },
    })

    expect(wrapper.find('.elp-filter-bar-item').exists()).toBe(true)
    expect(wrapper.find('.el-filter-bar-item').exists()).toBe(false)
  })

  test('emits search and reset events', async () => {
    const onSearch = vi.fn()
    const onReset = vi.fn()
    const wrapper = mount(FilterBar, {
      props: {
        searchText: 'Query',
        resetText: 'Clear',
        showReset: true,
        onSearch,
        onReset,
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons
      .find((button) => button.text().includes('Clear'))!
      .trigger('click')
    await buttons
      .find((button) => button.text().includes('Query'))!
      .trigger('click')

    expect(onReset).toHaveBeenCalledOnce()
    expect(onSearch).toHaveBeenCalledOnce()
  })

  test('controls advanced filters', async () => {
    const wrapper = mount(FilterBar, {
      props: {
        expanded: false,
        collapsible: true,
      },
      slots: {
        advanced: '<div class="advanced-field">advanced</div>',
      },
    })

    expect(
      wrapper.find('.elp-filter-bar__advanced').attributes('aria-hidden')
    ).toBe('true')
    expect(wrapper.find('.elp-filter-bar__advanced').attributes('inert')).toBe(
      'true'
    )

    await wrapper
      .findAll('button')
      .find((button) => button.text().includes('More'))!
      .trigger('click')

    expect(wrapper.emitted('update:expanded')).toEqual([[true]])

    await wrapper.setProps({ expanded: true })
    await nextTick()
    expect(wrapper.find('.elp-filter-bar__advanced').classes()).toContain(
      'is-expanded'
    )
    expect(
      wrapper.find('.elp-filter-bar__advanced').attributes('aria-hidden')
    ).toBe('false')
    expect(
      wrapper.find('.elp-filter-bar__advanced').attributes('inert')
    ).toBeUndefined()
  })

  test('exposes expansion controls', () => {
    const wrapper = mount(FilterBar)

    wrapper.vm.expand()
    wrapper.vm.collapse()
    wrapper.vm.toggle()

    expect(wrapper.emitted('update:expanded')).toEqual([
      [true],
      [false],
      [true],
    ])
  })

  test('supports custom actions', () => {
    const wrapper = mount(FilterBar, {
      slots: {
        actions: '<button class="custom-action">Export</button>',
      },
    })

    expect(wrapper.find('.custom-action').text()).toBe('Export')
    expect(wrapper.findAll('.elp-filter-bar__actions button')).toHaveLength(1)
  })

  test('places enabled actions after the last field', () => {
    const wrapper = mount(FilterBar, {
      slots: {
        default: '<div class="last-field">field</div>',
      },
    })

    const fields = wrapper.find('.elp-filter-bar__fields')
    expect(fields.element.lastElementChild).toBe(
      wrapper.find('.elp-filter-bar__actions').element
    )
    expect(wrapper.findAll('.elp-filter-bar__actions button')).toHaveLength(1)
    expect(wrapper.text()).not.toContain('Reset')
  })
})

describe('FilterBarItem', () => {
  test('renders label and control content', () => {
    const wrapper = mount(FilterBarItem, {
      props: {
        label: 'Status',
        labelWidth: 100,
        width: 300,
        minWidth: 220,
      },
      slots: {
        default: '<input class="control" />',
      },
    })

    expect(wrapper.find('.elp-filter-bar-item__label').text()).toBe('Status')
    expect(wrapper.find('.control').exists()).toBe(true)
    expect(wrapper.attributes('role')).toBe('group')
    expect(wrapper.attributes('aria-label')).toBe('Status')
    expect(wrapper.attributes('style')).toContain(
      '--elp-filter-bar-item-width: 300px'
    )
  })

  test('supports label slot and grow mode', () => {
    const wrapper = mount(FilterBarItem, {
      props: { grow: true },
      slots: {
        label: '<strong>Keyword</strong>',
        default: '<input />',
      },
    })

    expect(wrapper.classes()).toContain('is-grow')
    expect(wrapper.classes()).toContain('is-label-left')
    expect(wrapper.find('strong').text()).toBe('Keyword')
    expect(wrapper.classes()).not.toContain('is-without-label')
  })

  test('supports a joined append control and label alignment', () => {
    const wrapper = mount(FilterBarItem, {
      props: {
        label: 'Customer',
        labelAlign: 'right',
        appendWidth: 180,
      },
      slots: {
        default: '<select class="middle-control" />',
        append: '<input class="append-control" />',
      },
    })

    expect(wrapper.classes()).toContain('is-with-append')
    expect(wrapper.classes()).toContain('is-label-right')
    expect(wrapper.find('.middle-control').exists()).toBe(true)
    expect(wrapper.find('.append-control').exists()).toBe(true)
    expect(wrapper.attributes('style')).toContain(
      '--elp-filter-bar-append-width: 180px'
    )
  })

  test('supports an arbitrary component in the leading label region', () => {
    const wrapper = mount(FilterBarItem, {
      props: {
        labelMode: 'control',
        ariaLabel: 'Filter field',
      },
      slots: {
        label: '<select class="leading-select" />',
        default: '<input class="middle-input" />',
      },
    })

    expect(wrapper.classes()).toContain('is-label-control')
    expect(wrapper.find('.leading-select').exists()).toBe(true)
    expect(wrapper.find('.middle-input').exists()).toBe(true)
    expect(wrapper.attributes('aria-label')).toBe('Filter field')
  })
})
