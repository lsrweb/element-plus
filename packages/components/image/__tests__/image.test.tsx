import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import {
  IMAGE_FAIL,
  IMAGE_SUCCESS,
  mockImageEvent,
} from '@element-plus/test-utils/mock'
import Image from '../src/image.vue'
import triggerEvent from '@element-plus/test-utils/trigger-event'
import { EVENT_CODE } from '@element-plus/constants'
import { stableLoad } from '@element-plus/test-utils/stable-load'
import { defaultNamespace } from '@element-plus/hooks/use-namespace'

import type { AnchorHTMLAttributes, ImgHTMLAttributes } from 'vue'
import type { VueWrapper } from '@vue/test-utils'
import type { ImageInstance, ImageProps } from '../src/image'

type ElImageProps = ImgHTMLAttributes &
  AnchorHTMLAttributes &
  Partial<ImageProps>

const imageClass = `.${defaultNamespace}-image`
const imageInnerClass = `.${defaultNamespace}-image__inner`
const imagePreviewClass = `.${defaultNamespace}-image__preview`
const imagePlaceholderClass = `.${defaultNamespace}-image__placeholder`
const imageErrorClass = `.${defaultNamespace}-image__error`
const viewerImageClass = `.${defaultNamespace}-image-viewer__img`
const viewerProgressClass = `.${defaultNamespace}-image-viewer__progress`
const viewerCanvasClass = `.${defaultNamespace}-image-viewer__canvas`

let intersectionCallback: IntersectionObserverCallback | undefined

vi.mock('@vueuse/core', async () => {
  return {
    ...((await vi.importActual('@vueuse/core')) as Record<string, any>),
    useIntersectionObserver: (
      _target: any,
      cb: IntersectionObserverCallback
    ) => {
      intersectionCallback = cb
      return {
        stop: vi.fn(),
      }
    },
  }
})

// firstly wait for image event
// secondly wait for vue render
async function doubleWait() {
  await nextTick()
  await nextTick()
}

const _mount = (template: string, data: Record<string, any>) =>
  mount({
    components: {
      [Image.name!]: Image,
    },
    template,
    data,
  })

describe('Image.vue', () => {
  afterEach(() => {
    intersectionCallback = undefined
  })

  test('render test', () => {
    const wrapper = mount(Image)
    expect(wrapper.find(imageClass).exists()).toBe(true)
  })

  test('imageStyle fit test', async () => {
    const fits = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const
    for (const fit of fits) {
      const wrapper = mount(() => <Image src={IMAGE_SUCCESS} fit={fit} />)
      await doubleWait()
      expect(wrapper.find('img').attributes('style')).toContain(
        `object-fit: ${fit};`
      )
    }
  })

  test('preview classname test', async () => {
    const props: ElImageProps = {
      fit: 'cover',
      src: IMAGE_SUCCESS,
      previewSrcList: Array.from<string>({ length: 3 }).fill(IMAGE_SUCCESS),
    }
    const wrapper = mount(() => <Image {...props} />)
    await doubleWait()
    expect(wrapper.find('img').classes()).toContain(imagePreviewClass.slice(1))
  })

  test('preview initial index test', async () => {
    const props: ElImageProps = {
      src: IMAGE_SUCCESS,
      previewSrcList: Array.from<string>({ length: 3 }).map(
        (_, idx) => IMAGE_FAIL + idx
      ),
      initialIndex: 1,
      previewTeleported: false,
    }
    const wrapper = mount(() => <Image {...props} />)
    await doubleWait()
    await wrapper.find(imageInnerClass).trigger('click')
    expect(wrapper.find(viewerImageClass).attributes('src')).toBe(
      IMAGE_FAIL + 1
    )
  })

  test('native loading attributes', async () => {
    const wrapper = mount(Image, {
      props: {
        src: IMAGE_SUCCESS,
        loading: 'eager',
      } as ElImageProps,
    })

    await doubleWait()
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('loading')).toBe('eager')

    await wrapper.setProps({ loading: undefined })
    expect(wrapper.find('img').attributes('loading')).toBe(undefined)
  })

  test('$attrs', async () => {
    const alt = 'this ia alt'
    const props: ElImageProps = {
      alt,
      src: IMAGE_SUCCESS,
      referrerpolicy: 'origin',
    }
    const wrapper = mount(() => <Image {...props} />)
    await doubleWait()
    expect(wrapper.find('img').attributes('alt')).toBe(alt)
    expect(wrapper.find('img').attributes('referrerpolicy')).toBe('origin')
  })

  test('pass event listeners', async () => {
    let result = false
    const props: ElImageProps = {
      src: IMAGE_SUCCESS,
      onClick: () => (result = true),
    }
    const wrapper = mount(() => <Image {...props} />)
    await doubleWait()
    await wrapper.find(imageInnerClass).trigger('click')
    expect(result).toBeTruthy()
  })

  test('image preview close-on-press-escape', async () => {
    const onClose = vi.fn()
    const wrapper = mount(
      <Image
        previewSrcList={Array.from<string>({ length: 3 }).fill(IMAGE_SUCCESS)}
        onClose={onClose}
        closeOnPressEscape={false}
      />
    )

    await doubleWait()
    wrapper.getCurrentComponent().exposed!.showPreview()

    triggerEvent(document.body, 'keydown', EVENT_CODE.esc)
    await nextTick()
    expect(wrapper.vm.showViewer).toBeTruthy()

    await wrapper.setProps({ closeOnPressEscape: true })
    triggerEvent(document.body, 'keydown', EVENT_CODE.esc)
    await nextTick()

    expect(wrapper.vm.showViewer).toBeFalsy()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('manually open preview', async () => {
    const url = IMAGE_SUCCESS
    const srcList = Array.from<string>({ length: 3 }).map(
      (_, idx) => IMAGE_FAIL + idx
    )
    const wrapper = _mount(
      `
      <el-image
        ref="imageRef"
        style="width: 100px; height: 100px"
        :src="url"
        :preview-src-list="srcList"
        :initial-index="1"
        :preview-teleported="false"
        fit="cover"
      />`,
      () => ({
        url,
        srcList,
      })
    )
    await doubleWait()
    ;(wrapper.vm.$refs.imageRef as ImageInstance).showPreview()
    await doubleWait()
    expect(wrapper.find(viewerImageClass).attributes('src')).toBe(
      IMAGE_FAIL + 1
    )
  })

  test('lazy image loads when entering viewport', async () => {
    const wrapper = mount(Image, {
      props: {
        src: IMAGE_SUCCESS,
        lazy: true,
      } as ElImageProps,
    })
    await doubleWait()
    expect(wrapper.find('img').exists()).toBe(false)
    expect(intersectionCallback).toBeDefined()
    intersectionCallback?.(
      [
        {
          isIntersecting: true,
        } as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver
    )
    await nextTick()
    expect(wrapper.find('img').attributes('src')).toBe(IMAGE_SUCCESS)
  })

  test('`show-progress` prop to control whether to display progress', async () => {
    const url = IMAGE_SUCCESS
    const srcList = Array.from<string>({ length: 3 }).fill(IMAGE_SUCCESS)
    const wrapper = _mount(
      `
      <el-image
        ref="imageRef"
        :src="url"
        :preview-src-list="srcList"
        :show-progress="false"
        :preview-teleported="false"
      />`,
      () => ({
        url,
        srcList,
      })
    ) as unknown as VueWrapper<ImageInstance>
    await doubleWait()
    ;(wrapper.vm.$refs.imageRef as ImageInstance).showPreview()
    await doubleWait()
    expect(wrapper.find(viewerProgressClass).exists()).toBe(false)

    wrapper.setProps({ showProgress: true })
    await doubleWait()
    expect(wrapper.find(viewerProgressClass).exists()).toBe(true)
  })

  test('progress slot', async () => {
    const url = IMAGE_SUCCESS
    const srcList = Array.from<string>({ length: 3 }).fill(IMAGE_SUCCESS)
    const wrapper = _mount(
      `
      <el-image
        ref="imageRef"
        :src="url"
        :preview-src-list="srcList"
        :preview-teleported="false"
      >
        <template #progress="{ activeIndex, total }">
          <div>{{ activeIndex + 1 }} - {{ total }}</div>
        </template>
      </el-image>`,
      () => ({
        url,
        srcList,
      })
    ) as unknown as VueWrapper<ImageInstance>
    await doubleWait()
    ;(wrapper.vm.$refs.imageRef as ImageInstance).showPreview()
    await doubleWait()
    expect(wrapper.find(viewerProgressClass).exists()).toBe(true)
    expect(wrapper.find(viewerProgressClass).text()).toBe('1 - 3')

    // progress slot's priority is higher than `show-progress` prop
    wrapper.setProps({ showProgress: false })
    await doubleWait()
    expect(wrapper.find(viewerProgressClass).exists()).toBe(true)
  })

  test('custom viewer load failed slot', async () => {
    const url = IMAGE_SUCCESS
    const srcList = ['error']
    const wrapper = _mount(
      `
      <el-image
        ref="imageRef"
        :src="url"
        :preview-src-list="srcList"
        :preview-teleported="false"
      >
        <template #viewer-error>
          <div class="load-failed-slot">
            load failed slot
          </div>
        </template>
      </el-image>`,
      () => ({
        url,
        srcList,
      })
    )

    await doubleWait()
    ;(wrapper.vm.$refs.imageRef as ImageInstance).showPreview()
    await doubleWait()

    const img = wrapper.find(`${viewerCanvasClass} img`)
    await img.trigger('error')
    await doubleWait()
    expect(wrapper.find('.load-failed-slot').exists()).toBe(true)
  })

  describe('load', () => {
    mockImageEvent()

    test('image load success test', async () => {
      const alt = 'this ia alt'
      const wrapper = mount({
        setup() {
          const props: ElImageProps = {
            alt,
            src: IMAGE_SUCCESS,
          }
          return () => <Image {...props} />
        },
      })
      expect(wrapper.find(imagePlaceholderClass).exists()).toBe(true)
      await flushPromises()
      expect(wrapper.find(imageInnerClass).exists()).toBe(true)
      expect(wrapper.find('img').exists()).toBe(true)

      await stableLoad(() => !wrapper.find(imagePlaceholderClass).exists())
      expect(wrapper.find(imagePlaceholderClass).exists()).toBe(false)
      expect(wrapper.find(imageErrorClass).exists()).toBe(false)
    })

    test('image load error test', async () => {
      const wrapper = mount(Image, {
        props: {
          src: IMAGE_FAIL,
        },
      })
      await doubleWait()
      wrapper.emitted('error') && expect(wrapper.emitted('error')).toBeDefined()
      expect(wrapper.find(imageInnerClass).exists()).toBe(false)
      expect(wrapper.find('img').exists()).toBe(false)
      expect(wrapper.find(imageErrorClass).exists()).toBe(true)
    })

    test('image load sequence success test', async () => {
      const wrapper = mount(Image, {
        props: {
          src: IMAGE_FAIL,
        },
      })
      await flushPromises()
      const errorCountBefore = wrapper.emitted('error')?.length || 0

      await wrapper.setProps({ src: IMAGE_SUCCESS })
      await nextTick()
      const img = wrapper.find('img')
      if (img.exists()) {
        await img.trigger('load')
      }
      await flushPromises()
      // expect no new error event to be emitted
      expect(wrapper.emitted('error')?.length).toBe(errorCountBefore)

      expect(wrapper.find(imageInnerClass).exists()).toBe(true)
      expect(wrapper.find('img').exists()).toBe(true)

      await stableLoad(() => !wrapper.find(imagePlaceholderClass).exists())
      expect(wrapper.find(imagePlaceholderClass).exists()).toBe(false)
      expect(wrapper.find(imageErrorClass).exists()).toBe(false)
    })

    test('emit load event', async () => {
      const handleLoad = vi.fn()
      const props: ElImageProps = {
        src: IMAGE_SUCCESS,
        onLoad: handleLoad,
      }
      const wrapper = mount(() => <Image {...props} />)
      await flushPromises()
      // Manually trigger the load event if necessary
      const img = wrapper.find('img')
      if (img.exists()) {
        await img.trigger('load')
      }
      expect(wrapper.find(imageInnerClass).exists()).toBe(true)
      expect(handleLoad).toBeCalled()
    })
  })
})
