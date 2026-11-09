import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"
import { byDateAndAlphabetical } from "./PageList"
import { Date, getDate } from "./Date"
import { classNames } from "../util/lang"
import style from "./styles/homeSection.scss"

interface Options {
  title: string
  folder: string
  limit: number
  moreLabel: string
  emptyText: string
  showDates: boolean
}

// A homepage section listing the latest pages in one folder, with a button to the full list.
export default ((opts: Options) => {
  const HomeSection: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const prefix = opts.folder + "/"
    const pages = allFiles
      .filter((f) => f.slug?.startsWith(prefix) && !f.slug.endsWith("/index"))
      .sort(byDateAndAlphabetical(cfg))
    const folderSlug = (opts.folder + "/index") as FullSlug

    return (
      <section class={classNames(displayClass, "home-section")}>
        <h2>{opts.title}</h2>
        {pages.length === 0 ? (
          <p class="home-empty">{opts.emptyText}</p>
        ) : (
          <ul class="home-list">
            {pages.slice(0, opts.limit).map((page) => (
              <li>
                <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal home-card">
                  <span class="home-card-title">{page.frontmatter?.title}</span>
                  {page.frontmatter?.description && (
                    <span class="home-card-desc">{page.frontmatter.description as string}</span>
                  )}
                  {opts.showDates && page.dates && (
                    <span class="home-card-meta">
                      <Date date={getDate(cfg, page)!} locale={cfg.locale} />
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
        {pages.length > 0 && (
          <a href={resolveRelative(fileData.slug!, folderSlug)} class="internal home-more">
            {opts.moreLabel} →
          </a>
        )}
      </section>
    )
  }

  HomeSection.css = style
  return HomeSection
}) satisfies QuartzComponentConstructor<Options>
