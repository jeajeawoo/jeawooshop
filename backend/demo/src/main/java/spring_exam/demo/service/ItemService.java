package spring_exam.demo.service;

import spring_exam.demo.dto.ItemDto;
import spring_exam.demo.dto.ItemResponseDto;
import spring_exam.demo.entity.Item;

import java.io.IOException;
import java.util.List;


public interface ItemService {
    public List<ItemResponseDto> getItem();

    public Item getItemById(Long itemId);

    public Item insertItem(ItemDto itemDto) throws IOException;

    public Item updateItemWithImage(Long itemId, ItemDto itemDto) throws IOException;

    public void deleteItem(Long itemId);
}
