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
    created_at_str = report["created_at"].to_s
    date = Date.parse(created_at_str)

    doc = Docx::Document.open("app/assets/template.docx")
    docxEntries = []

    entries.each_with_index do |entry, index|
      docxEntries.push(nil)
      docxEntries.push(entry)
    end

    doc.paragraphs.each do |p|
      p.each_text_run do |tr|
        p "ITS HEREEE", tr.text
        if tr.text == "SATURDAY"
          tr.text=(date.strftime("%^A"))
        end
        if tr.text == ", APRIL 12"
          tr.text=(", #{date.strftime("%^B")} #{format_day(date.strftime("%-d"))}")
        end
        if tr.text == "th ,"
          tr.text=(" ,")
        end
        if tr.text == " 2020"
          tr.text=(" #{date.strftime("%Y")}")
        end
      end
    end
    
    doc.bookmarks['start'].insert_multiple_lines(docxEntries.map {|entry| entry ? "#{entry.time}#{entry.body}" : "" })
    title = "FHC DAY #{date.strftime("%m")}#{date.strftime("%d")}#{date.strftime("%Y")}.docx"
    doc.save("app/assets/documents/#{title}")

    { report: report, entries: entries, user: user, title: title}
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
