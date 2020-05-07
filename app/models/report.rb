class Report < ApplicationRecord
  belongs_to :user
  has_many :entries, dependent: :destroy

  # Could put validates
  # validates :body, presence: true

  def generate_doc
    require 'docx'
    entries = self.entries
    report = self
    user = User.find(self.user_id)
    # date = Date.new(report["timestamp"])
    date = Date.today

    doc = Docx::Document.open("template.docx")
    docxEntries = []
    # doc.bookmarks['day'].insert_after("SATURDAY")
    entries.each_with_index do |entry, index|
      docxEntries.push(nil) 
      docxEntries.push(entry)
    end
    doc.paragraphs.each do |p|
      p.each_text_run do |tr|
        if tr.text == "SATURDAY"
          tr.text=(date.strftime("%^A"))
        end
        if tr.text == ", APRIL 12th , 2020"
         
          tr.text=(", #{date.strftime("%^B")} #{format_day(date.strftime("%-d"))} , #{date.strftime("%Y")}")
        end
      end
    end
    # doc.bookmarks['day'].insert_text_after("SATURDAY")
    doc.bookmarks['start'].insert_multiple_lines(docxEntries.map {|entry| entry ? "#{entry.time}    #{entry.body}" : "" })
    # entries.each do |entry|
    #   doc.bookmarks['start'].insert_text_after("#{entry.body}")
    # end
    doc.save('exampleUpdate.docx')
    { report: report, entries: entries, user: user}
  end

  private

  def format_day(day)
    if (4..20).include?(day.to_i) || (24..30).include?(day.to_i)
      day.concat("th")
    else
      day.concat('st') if day[-1] == "1"
      day.concat('nd') if day[-1] == "2"
      day.concat('rd') if day[-1] == "3"
    end
  end
  
end
