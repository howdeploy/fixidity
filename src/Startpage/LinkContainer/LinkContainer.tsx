import { MouseEvent, useState } from "react"

import styled from "@emotion/styled"

import { AccordionContainer, AccordionGroup } from "./Accordion/Accordion"
import * as Settings from "../Settings/settingsHandler"

const LinkItem = styled.a`
  width: fit-content;
  white-space: nowrap;
  position: relative;
  padding: 10px 0 10px 30px;
  font-size: 1rem;

  ::before {
    position: absolute;
    left: 0px;
    bottom: 5px;
    z-index: 0;
    content: "";
    height: 5px;
    width: 100%;
    background-color: var(--accent-color);
    transition: 0.5s;
    opacity: 0.7;
  }

  :hover,
  :focus {
    color: var(--accent-color2);
    animation: text-flicker 0.01s ease 0s infinite alternate;
    outline: none;
  }
`

const RecentLinkItem = styled(LinkItem)`
  font-size: 0.9rem;
  opacity: 0.85;
  ::before {
    background-color: var(--accent-color2);
  }
`

const trackClick = (url: string) => {
  Settings.RecentSites.add(url)
}

export const LinkContainer = () => {
  const [active, setActive] = useState(0)
  const linkGroups = Settings.Links.getWithFallback()
  const recentSites = Settings.RecentSites.get()
  const recentIndex = linkGroups.length

  const middleMouseHandler = (event: MouseEvent, groupIndex: number) => {
    setActive(groupIndex)
    if (event.button === 1) {
      if (groupIndex < linkGroups.length) {
        linkGroups[groupIndex]?.links.forEach(link => {
          window.open(link.value, "_blank")
        })
      } else {
        recentSites.forEach(site => {
          window.open(site.url, "_blank")
        })
      }
    }
  }

  return (
    <AccordionContainer>
      {linkGroups.map((group, groupIndex) => (
        <AccordionGroup
          key={group.title}
          active={active === groupIndex}
          title={group.title}
          onClick={() => setActive(groupIndex)}
          onMouseDown={e => middleMouseHandler(e, groupIndex)}
        >
          {group.links.map(link => (
            <LinkItem
              tabIndex={active !== groupIndex ? -1 : undefined}
              key={link.label}
              href={link.value}
              onClick={() => trackClick(link.value)}
            >
              {link.label}
            </LinkItem>
          ))}
        </AccordionGroup>
      ))}
      {recentSites.length > 0 && (
        <AccordionGroup
          key="__recent__"
          active={active === recentIndex}
          title="Недавнее"
          onClick={() => setActive(recentIndex)}
          onMouseDown={e => middleMouseHandler(e, recentIndex)}
        >
          {recentSites.map(site => (
            <RecentLinkItem
              tabIndex={active !== recentIndex ? -1 : undefined}
              key={site.url + site.timestamp}
              href={site.url}
            >
              {site.label}
            </RecentLinkItem>
          ))}
        </AccordionGroup>
      )}
    </AccordionContainer>
  )
}
