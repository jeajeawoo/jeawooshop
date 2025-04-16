package spring_exam.demo.service;

import spring_exam.demo.dto.BuyItemDto;

import java.util.List;

public interface BuyItemService {

    public List<BuyItemDto> selectMemberBuyItem(Long memberid);

    public List<BuyItemDto> insertMemberItem(Long memberid , List<BuyItemDto> buyItemDto);

    public BuyItemDto deleteMemberBuyItem(Long id);

}
