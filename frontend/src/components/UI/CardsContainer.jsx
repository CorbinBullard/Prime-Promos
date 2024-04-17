import { Flex } from 'antd';
import React from 'react'

export default function CardsContainer({ CardComponent, items, selectItem }) {
  return (
    <Flex gap={8} wrap="wrap">
      {items &&
        items.map((project) => (
          <CardComponent
            project={project}
            key={project.id}
            selectProject={selectItem}
          />
        ))}
    </Flex>
  );
}
