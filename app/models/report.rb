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
         
          tr.text=(", #{date.strftime("%^B")} #{date.strftime("%-d")} , #{date.strftime("%Y")}")
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
  
end
