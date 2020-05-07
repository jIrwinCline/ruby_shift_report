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
    
    doc = Docx::Document.open("template.docx")
    docxEntries = []
    
    entries.each_with_index do |entry, index|
      docxEntries.push(nil) 
      docxEntries.push(entry)
    end
    doc.bookmarks['start'].insert_multiple_lines(docxEntries.map {|entry| entry ? "#{entry.time}    #{entry.body}" : "" })
    # entries.each do |entry|
    #   doc.bookmarks['start'].insert_text_after("#{entry.body}")
    # end
    doc.save('exampleUpdate.docx')
    { report: report, entries: entries, user: user}
  end
  
end
