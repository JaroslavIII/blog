import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { QuartzComponentProps } from "./quartz/components/types"

const isHome = (page: QuartzComponentProps) => page.fileData.slug === "index"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.ConditionalRender({
      component: Component.HomeSection({
        title: "Latest writing",
        folder: "blog",
        limit: 3,
        moreLabel: "All posts",
        emptyText: "The first post is on its way.",
        showDates: true,
      }),
      condition: isHome,
    }),
    Component.ConditionalRender({
      component: Component.HomeSection({
        title: "Achievements",
        folder: "achievements",
        limit: 3,
        moreLabel: "All achievements",
        emptyText: "Coming soon.",
        showDates: false,
      }),
      condition: isHome,
    }),
    Component.ConditionalRender({
      component: Component.HomeSection({
        title: "Projects",
        folder: "projects",
        limit: 3,
        moreLabel: "All projects",
        emptyText: "The first project is in the works.",
        showDates: false,
      }),
      condition: isHome,
    }),
  ],
  footer: Component.Footer({
    links: {
      About: "/about",
      GitHub: "https://github.com/JaroslavIII",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
